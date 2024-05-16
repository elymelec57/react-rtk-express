const jwt = require('jsonwebtoken');
const keySecret = require('../settings/keys');

function validateTokenAdmin(req,res,next){
    const { token } = req.cookies;

    if(!token) res.redirect('/login');

    jwt.verify(token, keySecret.key, (err, user)=>{
        if(err) res.redirect('/login');
        req.user = user;
        next();
    })
}

module.exports = {
    validateTokenAdmin
}