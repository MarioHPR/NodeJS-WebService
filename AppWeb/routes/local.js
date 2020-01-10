var express = require('express');
var router  = express.Router(); 
var axios   = require('axios');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('local');
});
/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log("aqui local");
    axios.post('http://localhost:3000/localidade/', {
        cidade : req.body.cidade,
        cep    : req.body.cep,
        bairro : req.body.bairro,
        rua    : req.body.rua,
        numero : req.body.numero
    }).then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
    });
    // acessar a api enviando os dados
    // if (ok da api)

    //	res.render('cadastrado');
});

// deletar
router.delete('/', function (req, res, next) {
    axios.delete('http://localhost:3000/local', {
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
    axios.post('http://localhost:3000/local', {
        cidade : req.body.cidade,
        cep    : req.body.cep,
        bairro : req.body.bairro,
        rua    : req.body.rua,
        numero : req.body.numero
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