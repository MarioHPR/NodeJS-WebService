var express = require('express');
var router = express.Router();
var axios  = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('usuario/cadastro');
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  // Requisições do tipo GET
  axios.post('http://localhost:3000/usuario',{
    nome:req.body.nome,
    dataNascimento : req.body.dataNascimento,
    cpf: req.body.cpf,
    usuario : req.body.usuario,
    senha : req.body.senha
  }).then(function(response){
      console.log(response.data); // ex.: { user: 'Your User'}
      if (response.status == 201) 
        res.redirect("/")
    });
  	// acessar a api enviando os dados
  	// if (ok da api)

  	//	res.render('cadastrado');
});


/* GET home page. */
router.get('/login', function (req, res, next) {
  res.render('usuario/login');
});

router.get('/consulta', function (req, res, next) {
  res.render('usuario/consulta');
});

router.post('/login', function (req, res, next) {
  axios.post('http://localhost:3000/login', {
    login: req.body.login,
    senha: req.body.senha
  }).then(function (response) {
    console.log(response.status); // ex.: { user: 'Your User'}
    if (response.status == 200) {
      res.redirect('menu/');
    }
    res.redirect('http://www.msn.com');
  });
});

module.exports = router;