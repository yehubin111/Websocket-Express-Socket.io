var express = require('express');
var router = express.Router();
var path = require('path')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render(path.resolve(__dirname,  '../views/index.jade'))
});

module.exports = router;
