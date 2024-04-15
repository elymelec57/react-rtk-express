const keySecret = require('../settings/keys');

const jwt = require('jsonwebtoken');

function createAccesToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, 
            keySecret.key, 
            { 
                expiresIn: '2h' 
            }, 
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}

module.exports = {
    createAccesToken
}
