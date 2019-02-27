const index = (req, res, next) => {
    res.render('control-panel/categories', {
        layout: 'control-panel'
    })
}

module.exports = {
    index
}