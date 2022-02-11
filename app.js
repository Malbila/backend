const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Thing = require('./models/thing')
const stuffRoutes = require('./routes/stuff')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const path = require('path')
const cors = require('cors')

const app = express()


mongoose.connect('mongodb+srv://Malbila:2CxsC4aWr7jGgwB@cluster0.adelz.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// })
app.use(cors())

app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/stuff', stuffRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/article', articleRoutes)


module.exports = app