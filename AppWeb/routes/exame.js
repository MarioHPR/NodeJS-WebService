var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) { 
    // Requisições do tipo GET
    axios.get('http://localhost:3000/exames', {
        params: {
            id_usuario : 1 
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data );
            res.render('usuario/exame', { exames : response.data });
        }
    }).catch(error => {});
});

router.get('/add', function (req, res, next) {
    // Requisições do tipo GET
    axios.get('http://localhost:3000/instituicao', {
        params: {
            id_usuario: 1
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
            res.render('usuario/addExame', { inst: response.data });
        }
    }).catch(error => { });
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    /*axios.get('http://localhost:3000/exames', {
        params: {
            id_usuario: 1
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
            res.render('usuario/exame', { exames: response.data });
        }
    }).catch(error => { });*/
});



module.exports = router;