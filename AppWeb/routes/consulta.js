var express = require('express');
var router  = express.Router();
var axios   = require('axios');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('usuario/consulta');
});
/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log("aqui");
    axios.post('http://localhost:3000/consultas', {
        diagnostico    : req.body.diagnostico,
        prescricao     : req.body.prescricao,
        nome_medico    : req.body.nome_medico,
        id_usuario     : req.body.id_usuario,
        id_instituicao : req.body.id_instituicao
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
router.delete('/consultas/', function (req, res, next) {
    axios.delete('http://localhost:3000/consultas', {
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

router.put('/consultas/', function name(req, res, next) {
    axios.put('http://localhost:3000/consultas', {
        diagnostico    : req.body.diagnostico,
        prescricao     : req.body.prescricao,
        nome_medico    : req.body.nome_medico,
        id_usuario     : req.body.id_usuario,
        id_instituicao : req.body.id_instituicao
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