const router = require('express').Router();

const { addArticle, initialValues, deleteArticle, deleteCat } = require('../controllers/carte')

router.get('/initialValues', initialValues)
router.post('/addArticle', addArticle)
router.post('/delete', deleteArticle)
router.post('/deleteCategory', deleteCat)


module.exports = router;