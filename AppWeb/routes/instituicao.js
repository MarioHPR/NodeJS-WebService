var express = require('express');
var router  = express.Router();
var axios   = require('axios');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('instituicao');
});
/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log("aqui");
    axios.post('http://localhost:3000/instituicao', {
        nome     : req.body.nome,
        id_local : req.body.id_local
    }).then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        if (response.status == 201)
            res.redirect("/")
    });
    // acessar a api enviando os dados
    // if (ok da api)

    //	res.render('cadastrado');
});

// deletar
router.delete('/', function (req, res, next) {
    axios.delete('http://localhost:3000/instituicao', {
        data: {
            id: req.body.id
        }
    }).then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        if (response.status == 201) {
            res.render('index', {
                palavra: "EXcluído com sucesso"
            });
        }
    }).catch(error => {
        res.render('index', {

        });
    });
});

router.put('/', function name(req, res, next) {
    axios.put('http://localhost:3000/instituicao', {
        nome     : req.body.nome,
        id_local : req.body.id_local
    }).then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        if (response.status == 201) {
            res.render('index', {
                palavra: "editada com sucesso"
            });
        }
    }).catch(error => {
        res.render('index', {
            palavra: "Não foi possivel excluir",
            idioma: " no banco de dados"
        });
    });
});
module.exports = router;