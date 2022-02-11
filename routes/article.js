const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const articleCtrl = require('../controllers/article')

router.get('/', articleCtrl.getAllArticle)
router.post('/', auth, multer, articleCtrl.createArticle)
router.get('/:id', articleCtrl.getOneArticle)
router.put('/:id', multer, articleCtrl.modifyArticle)
router.delete('/:id',auth, articleCtrl.deleteArticle)

module.exports = router