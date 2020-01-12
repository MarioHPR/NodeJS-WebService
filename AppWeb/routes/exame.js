var express = require('express');
var router  = express.Router();
var axios   = require('axios');
var multer  = require('multer');
var multerConfig = require('./config/multer'); 

var FormData = require('form-data');
var fs = require('fs');


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

router.post('/', multer(multerConfig).single('file'),  function (req, res) {
    console.log(req.file);
    console.log(JSON.stringify(req.body));
    /*axios.post('http://localhost:3000/exames', {
        params: {
            nome: req.body.name,
            id_usuario: 1,
            id_instituicao: req.body.seletor,
            link : req.file.path
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
            res.render('usuario/exame', { exames: response.data });
        }
    }).catch(error => { });*/
/*
    axios.post('http://localhost:3000/parametros', {
        params: {
            nome: req.body.name,
            id_usuario: 1,
            id_instituicao: req.body.seletor,
            link: req.file.path
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
            res.render('usuario/exame', { exames: response.data });
        }
    }).catch(error => { });
*/
});
module.exports = router;