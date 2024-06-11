const authLoginRedirecter = (req,res,next) => {
    if(req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

const authHomeRedirecter = (req,res,next) => {
    if(!req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = { authLoginRedirecter, authHomeRedirecter }