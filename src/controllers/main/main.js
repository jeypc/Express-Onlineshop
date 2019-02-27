const home = (req, res) => {
    res.render('main/home', {
        layout: 'main',
        title: 'Home',
        helpers: {
            script: function(){
                return '<script src="http://localhost"></script>'
            },
            css: function(){
                return ''
            }
        }
    })
}

const category = (req, res) => {
    res.render('main/category', {layout: 'main-single'})
}

const cart = (req, res) => {
    res.render('main/cart', {layout: 'main-single'})
}

module.exports = {
    home, category, cart
}