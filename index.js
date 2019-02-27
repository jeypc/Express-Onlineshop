const express = require('express')
const session = require('express-session')
const flashSession = require('connect-flash')
const bodyParser = require('body-parser')
const busboy = require('connect-busboy')
const busboyBodyParser = require('busboy-body-parser')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const minifyHTML = require('express-minify-html')
const validator = require('express-validator')
const paginate = require('express-paginate')
const handlebarHelper = require('./src/helpers/handlebar')
const mainRoutes = require('./src/routes/main')
const controlPanelRoutes = require('./src/routes/control-panel')
const authRoutes = require('./src/routes/auth')
const app = express()

mongoose.connect('mongodb://localhost/onlineshop')
global.productImgPath = path.join(__dirname, '/public/images/product/')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('.hbs', exphbs({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '/src/views/layouts'),
  helpers: handlebarHelper
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(minifyHTML({
  override:      true,
  exception_url: false,
  htmlMinifier: {
      removeComments:            true,
      collapseWhitespace:        true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes:     true,
      removeEmptyAttributes:     true,
      minifyJS:                  true
  }
}));

app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(validator())
app.use(session({
  secret: 'onlineshop123',
  resave: false,
  saveUninitialized: false
}))
app.use(flashSession())
app.use(paginate.middleware(10, 50))
app.use('/', mainRoutes)
app.use('/auth', authRoutes)
app.use('/control-panel', controlPanelRoutes)

app.listen(8000);