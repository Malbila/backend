const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Thing = require('./models/thing')
const stuffRoutes = require('./routes/stuff')

const app = express()


mongoose.connect('mongodb+srv://Malbila:2CxsC4aWr7jGgwB@cluster0.adelz.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/stuff', stuffRoutes)

app.use(bodyParser.json())




module.exports = app