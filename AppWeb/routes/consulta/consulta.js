var express = require('express');
var router  = express.Router();
var axios   = require('axios');
var multer  = require('multer');
var multerConfig = require('.././config/multer');
/* GET home page. */
router.get('/', function (req, res, next) {
    // Requisições do tipo GET
    let parametros = {
        params: {
            idUsuario: 1
        }
    }

    axios.all([
        axios.get('http://localhost:3000/consultas', parametros), 
        axios.get('http://localhost:3000/instituicao', parametros)
    ])
    .then(axios.spread(function (respConsultas, respInstituicao) {

        if (respConsultas.status == 200 && respInstituicao.status == 200) {
            let data;
            let arrayParamets = [];

            for (let i = 0; i < respConsultas.data.length; i++) {
                data = respConsultas.data[i].dataConsulta;
                data = data.substr(0, 10);
                //data = data.split('-').reverse().join('/');
                respConsultas.data[i].dataConsulta = data;
                respConsultas.data[i].linkImage = respConsultas.data[i].linkImage.substring(respConsultas.data[i].linkImage.indexOf("\\images"));
                arrayParamets.push({ ids: respConsultas.data[i].idInstituicao })
            }

            axios.post('http://localhost:3000/localidade/local', {
                arrayParamets
            }).then(function (resp) {
                if (resp.status == 200) {
                    console.log("@@@@@@@@@@@@")
                    console.log("@@@@@@@@@@@@")
                    console.log("@@@@@@@@@@@@")
                    console.log(respConsultas.data)
                    console.log("@@@@@@@@@@@@")
                    console.log("@@@@@@@@@@@@")
                    console.log("@@@@@@@@@@@@")

                    res.render('consulta/listaConsultas', { consultas: respConsultas.data, instituicao: resp.data, todasInst: respInstituicao.data });
                }
            }).catch(error => { });
        }

    })).catch(error => {
            console.log(error)
        });
});
/*
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
            idConsulta: req.query.consulta,
            idUsuario: 1,
            idInstituicao: req.query.idInstituicao
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
// GET users listing. */
router.post('/', multer(multerConfig).single('file'), function (req, res) {
    console.log("++++++++++++++++++=");
    console.log("++++++++++++++++++=");
    console.log("++++++++++++++++++=");
    console.log("++++++++++++++++++=");
    console.log(req.body.diagnostico)
    console.log("++++++++++++++++++=");
    console.log(req.file)
    console.log("++++++++++++++++++=");
    console.log("++++++++++++++++++=");


    // Variaveis para o axios
    const arrayAtributo = [];
    let aux = req.file ? req.file.path : '';

    axios.post('http://localhost:3000/consultas', {
        diagnostico: req.body.diagnostico,
        prescricao: req.body.prescricao,
        nomeMedico: req.body.nomeMedico,
        linkImage: aux,
        dataConsulta: req.body.dataConsulta,
        idUsuario: 1,
        idInstituicao: req.body.seletor
    })
    .then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        if (response.status == 200)
            res.redirect("/consulta")
    });
    // acessar a api enviando os dados
    // if (ok da api)

    //	res.render('cadastrado');*/
});

router.post('/Instituicao', multer(multerConfig).single('file'), function (req, res) {
    console.log("++++++++++++++++++=");
    console.log("++++++++++++++++++=");
    console.log("++++++++++++++++++=");
    console.log("hahaha++++++++++++++++++=");
    console.log(req.body)
    console.log("gagaga++++++++++++++++++=");
    console.log("++++++++++++++++++=");
    console.log("++++++++++++++++++=");
});



// deletar
router.post('/del', function (req, res, next) {
    axios.delete('http://localhost:3000/consultas', {
        data: {
            id: req.body.id
        }
    }).then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        if (response.status == 200) {
            res.redirect("/consulta")
        }
    }).catch(error => {
        res.render('index', {

        });
    });
});

router.put('/consultas/', function name(req, res, next) {
    axios.put('http://localhost:3000/consultas', {
        diagnostico: req.body.diagnostico,
        prescricao: req.body.prescricao,
        nome_medico: req.body.nome_medico,
        id_usuario: req.body.id_usuario,
        id_instituicao: req.body.id_instituicao
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