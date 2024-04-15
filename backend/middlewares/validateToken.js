const jwt = require('jsonwebtoken');
const keySecret = require('../settings/keys');

function validateToken(req,res,next){
    const { token } = req.cookies;

    if(!token) return res.status(401).json({message:"no token, autorizacion denegada"});

    jwt.verify(token, keySecret.key, (err, user)=>{
        if(err) return res.status(403).json({message: "token invalido"});
        req.user = user;
        next();
    })
}

module.exports = {
    validateToken
}