var express = require('express');
var router  = express.Router();
var axios   = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    res.render('index');
});



module.exports = router;