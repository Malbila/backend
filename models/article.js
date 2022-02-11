const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    pointure: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
})

module.exports = mongoose.model('Article', articleSchema)