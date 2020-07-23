/*var express = require('express');
var router  = express.Router();
var axios   = require('axios');
/* GET home page. *
router.get('/', function (req, res, next) {
    // Requisições do tipo GET
    axios.get('http://localhost:3000/consultas', {
        params: {
            idUsuario: 1
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data)
            res.render('usuario/consulta', { consultas: response.data });
        }
    }).catch(error => { });
   // res.render('usuario/consulta');
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
            res.render('usuario/addConsulta', { inst: response.data });
        }
    }).catch(error => { });
});

router.get('/visualizacao', function (req, res, next) {/// MEXER EM TUDO
    // Requisições do tipo GET
    //res.render('usuario/visualizarExame', { teste: "ew", inst: "testeee", campos: "teste" });/*
    axios.get('http://localhost:3000/consultas/visu', {
        params: {
            idConsulta    : req.query.consulta,
            idUsuario     : 1,
            idInstituicao : req.query.idInstituicao 
        }
    }).then(function (response) {
        if (response.status == 200) {
            axios.get('http://localhost:3000/instituicao', {
                params: {
                    id_usuario: 1
                }
            }).then(function (resp) {
                if (resp.status == 200) {
                   // var link = response[0].linkImage;
                    //response[0].linkImage = link.substring(link.indexOf("\\images"));
                    res.render('usuario/visualizarConsulta', { inst: resp.data, dados: response.data });
                }
            }).catch(error => { });
        }
    }).catch(error => { });
});
/* GET users listing. 
router.post('/', function (req, res, next) {
    console.log("aqui");
    axios.post('http://localhost:3000/consultas', {
        diagnostico    : req.body.diagnostico,
        prescricao     : req.body.prescricao,
        nome_medico    : req.body.nome_medico,
        id_usuario     : 1,
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
module.exports = router;*/