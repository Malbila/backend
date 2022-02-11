const Article = require('../models/article')
const fs = require('fs')

// **************************************CREATE ARTICLE****************************************************

exports.createArticle = (req, res, next) => {
    const articleObject = JSON.parse(req.body.article)
    delete articleObject._id
    const article = new Article ({
        ...articleObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    article.save().then(
        () => {
            res.status(201).json({
                message: 'Item saved successfully'
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}

// *******************************************GET ARTICLE**************************************************

exports.getOneArticle = (req, res, next) => {
    Article.findOne({
        _id: req.params.id
    }).then(
        (article) => {
            res.status(200).json(article)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error 
            })
        }
    )
}


// *****************************************MODIFY ARTICLE********************************************************

exports.modifyArticle = (req, res, next) => {
    const articleObject = req.file ?
    {
        ...JSON.parse(req.body.article),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :
    {
        ...req.body
    }
  Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id }).then(
        () => {
            res.status(200).json({
               message: 'Thing updated successfully !'
            })
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}


exports.reduceQuantity = (req, res, next) => {
    const currentData = {
        ...req.body,
        quantity: req.body.quantity-1
    } 
    Article.updateOne({ _id: req.params.id }, { ...currentData, _id: req.params.id }).then(
        () => {
            res.status(200).json({
               message: 'Quantity updated !'
            })
            console.log(articleObject)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            })
        }
    )
}

// *****************************************DELETE ARTICLE***************************************************************

exports.deleteArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then(article => {
            const filename = article.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Article.deleteOne({ _id: req.params.id }).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted'
                        })
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        })
                    }
                ) 
            })
        })
        .catch(error => res.status(500).json({ error }))
}

// ****************************************GET ALL ARTICLES******************************************************

exports.getAllArticle = (req, res, next) => {
    Article.find().then(
        (articles) => {
            res.status(200).json(articles)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            })
        }
    )
}
