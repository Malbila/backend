const express = require('express')

const app = express()

app.use((req, res) => {
    res.json({message: 'Hello server'})
})

module.exports = app