var express = require('express');
var router  = express.Router();
var axios   = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    
    res.render('index');
});
router.get('/finalizar', function (req, res, next) {//// mexer aqui qndo arrumar as sessões
    console.log("aaaaaaaaaaaaaaaaaaaaaaaa quiiii");
    res.redirect('/usuario/login');
});



module.exports = router;