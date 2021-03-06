const Thing = require('../models/thing')
const fs = require('fs')

// **************************************CREATE THING****************************************************

exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing)
    delete thingObject._id
    const thing = new Thing({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully'
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

// *******************************************GET THING**************************************************

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing)
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error 
            })
        }
    )
}

// *****************************************MODIFY THING********************************************************

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
    {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } :
    {
        ...req.body
    }
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id }).then(
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

// *****************************************DELETE THING***************************************************************

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({ _id: req.params.id }).then(
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

// ****************************************GET THINGS******************************************************

exports.getAllStuff = (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            })
        }
    )
}
