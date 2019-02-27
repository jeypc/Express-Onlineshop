const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('./../models/user')

router.get('/login', (req, res) => {
    res.render('auth/login', {message: req.flash('message')})
    req.session.message = null
})

router.post('/login', (req, res) => {
    User.findOne({'username': req.body.username})
        .then(doc => {
            if (doc) {
                if ( bcrypt.compareSync(req.body.password, doc.password) ) {
                    req.session.logged_in = true
                    req.session.username = doc.username
                    req.session.fullname = doc.fullname
                    res.redirect('/control-panel')
                }
            }
            req.flash('message', 'Username atau password anda salah.')
            res.redirect('/auth/login')
        })
});

module.exports = router