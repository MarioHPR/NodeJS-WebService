var express = require('express');
var router  = express.Router();
var axios   = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});



module.exports = router;