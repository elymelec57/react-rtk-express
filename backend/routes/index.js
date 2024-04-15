var express = require('express');
var router = express.Router();

const user = require('../models').User;

require('dotenv').config();
const title = process.env.APP_TITLE;

/* GET home page. */
router.get('/', async function(req, res, next) {
  let User = await user.findAll();
  res.render('index', { title, User });
});

module.exports = router;
