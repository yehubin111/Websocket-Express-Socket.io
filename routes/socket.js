const express = require('express');
// const URL = require('url');
const router = express.Router();

router.get('/', function(req, res, next) {
    // var params = URL.parse(req.url, true).query;

    
    res.send('hello socket');
})

module.exports = router;