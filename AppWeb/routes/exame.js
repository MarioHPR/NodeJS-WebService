var express      = require('express');
var router       = express.Router();
var axios        = require('axios');
var multer       = require('multer');
var multerConfig = require('./config/multer');

var FormData = require('form-data');
var fs = require('fs');
 /*
router.get('/', function (req, res, next) {
    console.log("*****************")
    console.log("*****************")
    console.log("Entrou get um hahah")
    console.log("*****************")
    console.log("*****************")
    axios.get('http://localhost:3000/exames', {
        params: {
            id_usuario: 1
        }
    }).then(function (response) {
        if (response.status == 200) {
            console.log(response.data);
            res.render('exame/exame', { exames: response.data });
        }
    }).catch(error => { });
});

router.get('/add', function (req, res, next) {
    console.log("*****************")
    console.log("*****************")
    console.log("Entrou get 2 hahah")
    console.log("*****************")
    console.log("*****************")
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

router.get('/visualizacao', function (req, res, next) {
    console.log("*****************")
    console.log("*****************")
    console.log("Entrou get 3 hahah")
    console.log("*****************")
    console.log("*****************")
    axios.get('http://localhost:3000/instituicao/visu', {
        params: {
            idUsuario: 1,
            idExame: req.query.exame,
            idInstituicao: req.query.idInstituicao
        }
    }).then(function (response) {
        if (response.status == 200) {
            let resposta = response.data;
            axios.get('http://localhost:3000/parametros', {
                params: {
                    idExame: req.query.exame,
                }
            }).then(function (respon) {
                if (respon.status == 200) {
                    axios.get('http://localhost:3000/instituicao', {
                        params: {
                            id_usuario: 1
                        }
                    }).then(function (resp) {
                        if (resp.status == 200) {
                            var link = resposta[0].linkImage;
                            resposta[0].linkImage = link.substring(link.indexOf("\\images"));
                            res.render('usuario/visualizarExame', { inst: resp.data, dados: resposta, campos: respon.data });
                        }
                    }).catch(error => { });
                    
                }
            }).catch(error => { });
        }
    }).catch(error => { });
});

router.post('/', multer(multerConfig).single('file'), function (req, res) {
    console.log("*****************")
    console.log("*****************")
    console.log("Entrou no post hahah")
    console.log("*****************")
    console.log("*****************")
    /*const arrayParametros = []
    let aux = req.file ? req.file.path : '';
    for (let index = 0; index < (Object.keys(req.body).length - 3) / 2; index++) {
        arrayParametros.push({ A: req.body[`A${index}`], V: req.body[`V${index}`] })
    }
    axios.post('http://localhost:3000/exames',
        {
            nome: req.body.nome,
            id_usuario: 1,
            id_instituicao: req.body.seletor,
            link: aux
        }
    ).then(function (response) {
        if (response.status == 200) {
            axios.post('http://localhost:3000/parametros',
                {
                    id_exame: response.data.id,
                    arrayParametros
                }
            ).then(function (response) {
                if (response.status == 200) {
                    axios.get('http://localhost:3000/exames', {
                        params: {
                            id_usuario: 1
                        }
                    }).then(function (response) {
                        if (response.status == 200) {
                            res.render('usuario/exame', { exames: response.data });
                        }
                    }).catch(error => { });
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }).catch(error => {
        console.log(error)
    });

});

router.get('/del/:id', function (req, res, next) {
    console.log(req.params.id);
    axios.delete('http://localhost:3000/tipoExame/', {
        data: {
            id: req.params.id
        }
    }).then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        if (response.status == 200) {
            axios.get('http://localhost:3000/exames', {
                params: {
                    id_usuario: 1
                }
            }).then(function (resp) {
                if (resp.status == 200) {
                    console.log(resp.data);
                    res.render('exame/exame', { exames: resp.data });
                }
            }).catch(error => { });
        }
    }).catch(error => {
        res.render('index', {

        });
    });
});*/
module.exports = router;