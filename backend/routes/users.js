var express = require('express');
var router = express.Router();
const { validateToken } = require('../middlewares/validateToken');

/* GET users listing. */
const userCtrl = require('../controllers/user.controller')

router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);
router.post('/register', userCtrl.register);
router.post('/verify', userCtrl.verify);

router.get('/profile', validateToken, userCtrl.profile);
router.put('/edit/profile', validateToken, userCtrl.editProfile);
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
