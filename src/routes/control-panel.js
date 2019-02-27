const express = require('express')
const router = express.Router()
const auth = require('./../middlewares/auth')
const multer = require('multer')
const mime = require('mime')
const v = require('voca')
const Categories = require('./../controllers/control-panel/categories')
const Product = require('./../controllers/control-panel/product')

var storage	= multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, productImgPath);
    },
    filename: (req, file, callback) => {
      callback(null, v.stripTags(req.body.name, null, '-') + '-' + Date.now() + '.' + mime.getExtension(file.mimetype));
    }
});

var upload = multer({ storage : storage });

router.get('/', auth.controlPanelAuth, (req, res) => {
    res.render('control-panel/home', {
        layout: 'control-panel'
    })
})
router.get('/categories', Categories.index)
router.get('/products', Product.index)
router.get('/product/create', Product.create)
router.post('/product/create', upload.any(), Product.save)
router.delete('/product/delete', Product.removeProduct)

module.exports = router