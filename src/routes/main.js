const express = require('express')
const router = express.Router();
const Main = require('./../controllers/main/main')

router.get('/', Main.home)
router.get('/category', Main.category)
router.get('/cart', Main.cart)

module.exports = router