function isAuthenticatedControlPanel(req, res, next) {
    if (req.session.logged_in === true)
        return next();

    res.redirect('/auth/login');
}

function isUserAuthenticated(req, res, next) {
    return next()
}

module.exports = {
    controlPanelAuth: isAuthenticatedControlPanel,
    userAuth: isUserAuthenticated
}