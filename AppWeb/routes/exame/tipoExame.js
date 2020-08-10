var express = require('express');
var router  = express.Router();
var axios   = require('axios');
var multer  = require('multer');
var multerConfig = require('.././config/multer');

var FormData = require('form-data');
var fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {

    let parametroAxios = {
        params: {
            idUsuario: 1
        }
    };
    axios.all([
        axios.get('http://localhost:3000/tipoExame', parametroAxios),
        axios.get('http://localhost:3000/instituicao', parametroAxios)
    ]).then(axios.spread(function (respTipoExame, respInstituicao) {
        if (respTipoExame.status == 200 && respInstituicao.status == 200) {
            res.render('exame/exame', { exames: respTipoExame.data, inst: respInstituicao.data });
        }
    })).catch(error => {
            console.log(error)
    });
});

router.get('/visualizacao', function (req, res, next) {
    let parametrosAxios = {
        params: {
            idTipoExame: req.query.exame
        }
    }
    let paramInstituicao = {
        params: {
            idUsuario: 1
        }
    }
    axios.all([
        axios.get('http://localhost:3000/parametrosGerais', parametrosAxios),
        axios.get('http://localhost:3000/instituicao', paramInstituicao)
    ]) 
        .then(axios.spread(function (respParametrosGerais, respInstituicao) {
            if (respParametrosGerais.status == 200) {
                let fim = respParametrosGerais.data.length;
                let data;
                let link;
                let arrayParamets = [];
                for (let i = 0; i < fim; i++) {
                    data = respParametrosGerais.data[i].dataExame;
                    data = data.substr(0, 10);
                    data = data.split('-').reverse().join('/');
                    respParametrosGerais.data[i].dataExame = data;
                    if (respParametrosGerais.data[i].linkImage){
                        link = respParametrosGerais.data[i].linkImage;
                        respParametrosGerais.data[i].linkImage = link.substring(link.indexOf("\\images"));
                    }
                    arrayParamets.push({ ids: respParametrosGerais.data[i].idInstituicao})
                }
                axios.post('http://localhost:3000/localidade/local', {       
                    arrayParamets
                }).then(function (resp) {
                    if (resp.status == 200) {
                        let arrayCamposDistintos = [];
                        let arrayAux = [];

                        for (let t in respParametrosGerais.data){
                            if (arrayAux.indexOf(respParametrosGerais.data[t].campo) == -1 ){
                                arrayAux.push(respParametrosGerais.data[t].campo);
                                arrayCamposDistintos.push({ id: respParametrosGerais.data[t].id, campo : respParametrosGerais.data[t].campo});
                            }
                        }
                        //  a(id="arq" type="button" value="Escolher arquivo" class="file-button form-control-file nav-link badge-light") 
                        res.render("exame/listaExames", { idTipoExame: req.query.exame, inst: respInstituicao.data, campoCadastro: arrayCamposDistintos, nomeExame: req.query.nomeExame, dadosExame: respParametrosGerais.data, localidade: resp.data });
                    }
                }).catch(error => { });
            }
           
        })).catch(error => {
            console.log(error)
        });
});
/*
router.get('/visualizacao', function (req, res, next) {
    let parametrosAxios = {
        params: {
            idTipoExame: req.query.exame
        }
    }
    let paramInstituicao = {
        params: {
            idUsuario: 1
        }
    }
    axios.all([
        axios.get('http://localhost:3000/exames', parametrosAxios),
        axios.get('http://localhost:3000/parametrosGerais', parametrosAxios),
        axios.get('http://localhost:3000/instituicao', paramInstituicao)
    ])
        .then(axios.spread(function (respExames, respParametrosGerais, respInstituicao) {
            if (respExames.status == 200) {
                let fim = respExames.data.length;
                let data;
                let link;
                let arrayParamets = [];
                for (let i = 0; i < fim; i++) {
                    data = respExames.data[i].dataExame;
                    data = data.substr(0, 10);
                    data = data.split('-').reverse().join('/');
                    respExames.data[i].dataExame = data;
                    if (respExames.data[i].linkImage) {
                        link = respExames.data[i].linkImage;
                        respExames.data[i].linkImage = link.substring(link.indexOf("\\images"));
                    }
                    arrayParamets.push({ ids: respExames.data[i].idInstituicao })
                }
                axios.post('http://localhost:3000/localidade/local', {
                    arrayParamets
                }).then(function (resp) {
                    if (resp.status == 200) {
                        let arrayCamposDistintos = [];
                        let arrayAux = [];

                        for (let t in respParametrosGerais.data) {
                            if (arrayAux.indexOf(respParametrosGerais.data[t].campo) == -1) {
                                arrayAux.push(respParametrosGerais.data[t].campo);
                                arrayCamposDistintos.push({ id: respParametrosGerais.data[t].id, campo: respParametrosGerais.data[t].campo });
                            }
                        }
                        //  a(id="arq" type="button" value="Escolher arquivo" class="file-button form-control-file nav-link badge-light") 
                        res.render("exame/listaExames", { idTipoExame: req.query.exame, inst: respInstituicao.data, campoCadastro: arrayCamposDistintos, nomeExame: req.query.nomeExame, dadosExame: respExames.data, dadosParametros: respParametrosGerais.data, localidade: resp.data });
                    }
                }).catch(error => { });
            }

        })).catch(error => {
            console.log(error)
        });
});
*/

router.post('/', multer(multerConfig).single('file'), function (req, res) {
    // Variaveis para o axios
    const arrayAtributo = [];
    let aux = req.file ? req.file.path : '';
    let parametroAxios1, parametroAxios2, parametroDefault;
    // captura campos
    for (let index = 0; index < (Object.keys(req.body).length - 4) / 2; index++) {
        arrayAtributo.push({ A: req.body[`A${index}`] })
    }
    parametroAxios1 = {campo : arrayAtributo};
    // AJUSTAR IDUSUARIO DEPOIS
    parametroAxios2 = {
        nomeExame : req.body.nomeExame,
        idUsuario : 1 
    }
    parametroDefault = {
        params: {
            idUsuario: 1
        }
    }

    axios.all([
        axios.post('http://localhost:3000/campoParametro', parametroAxios1),
        axios.post('http://localhost:3000/tipoExame', parametroAxios2)
    ])
    .then(axios.spread(function (respCampoParametros,respTipoExame) {
        axios.post('http://localhost:3000/exames',
            {
                idInstituicao : req.body.seletor,
                link          : aux,
                dataExame	  : req.body.dataExame,
                idTipoExame   : respTipoExame.data.id
            }
        ).then(function (response) {
            if (response.status == 200) {
                let arrayParamets =[];
                for (let index = 0; index < (Object.keys(req.body).length - 4) / 2; index++) {
                    arrayParamets.push({ idA: respCampoParametros.data[index].campo, V: req.body[`V${index}`]})
                }
                axios.post('http://localhost:3000/parametroExame',
                    {
                        idExame : response.data.id,
                        arrayParamets
                    }
                ).then(function (respon) {
                    if (respon.status == 200) {
                        res.redirect('/tipoExame');
                    }
                }).catch(error => {
                    console.log(error)
                });
            }
        }).catch(error => {
            console.log(error)
        });
    })).catch(error => {
        console.log(error)
    });
});

router.post('/Instituicao', multer(multerConfig).single('file'), function (req, res) {
    // Variaveis para o axios
    const arrayAtributo = [];
    let aux = req.file ? req.file.path : '';
    let parametroAxios1, parametroAxios2, parametroDefault;
    // captura campos
    for (let index = 0; index < (Object.keys(req.body).length - 9) / 2; index++) {
        arrayAtributo.push({ A: req.body[`A${index}`] })
    }
    parametroAxios1 = { campo: arrayAtributo };
    // AJUSTAR IDUSUARIO DEPOIS
    parametroAxios2 = {
        nomeExame: req.body.nomeExame,
        idUsuario: 1
    } 
    parametroDefault = {
        params: {
            idUsuario: 1
        }
    }
    axios.all([
        axios.post('http://localhost:3000/campoParametro', parametroAxios1),
        axios.post('http://localhost:3000/tipoExame', parametroAxios2),
        axios.post('http://localhost:3000/localidade', {
            cidade: req.body.cidade,
            cep: req.body.cep,
            bairro: req.body.bairro,
            rua: req.body.rua,
            numero: req.body.numero
        })
    ])
        .then(axios.spread(function (respCampoParametros, respTipoExame, respLocalidade) {
            axios.post('http://localhost:3000/instituicao/', {
                nome: req.body.nomeInstituicao,
                idLocal: respLocalidade.data.id,
                idUsuario: 1
            }).then(function (response) {
                if (response.status == 200) {
                    axios.post('http://localhost:3000/exames',
                        {
                            idInstituicao: response.data.id,
                            link: aux,
                            dataExame: req.body.dataExame,
                            idTipoExame: respTipoExame.data.id
                        }
                    ).then(function (resp) {
                        if (resp.status == 200) {
                            let arrayParamets = [];
                            for (let index = 0; index < (Object.keys(req.body).length - 9) / 2; index++) {
                                arrayParamets.push({ idA: respCampoParametros.data[index].campo, V: req.body[`V${index}`] })
                            }
                            axios.post('http://localhost:3000/parametroExame',
                                {
                                    idExame: resp.data.id,
                                    arrayParamets
                                }
                            ).then(function (respon) {
                                if (respon.status == 200) {
                                    res.redirect('/tipoExame');
                                }
                            }).catch(error => {
                                console.log(error)
                            });
                        }
                    }).catch(error => {
                        console.log(error)
                    });
                }
            });
        })).catch(error => {
            console.log(error)
        });
});




router.post('/exameExistente', multer(multerConfig).single('file'), function (req, res) {
    // Variaveis para o axios
    const arrayAtributo = [];
    let aux = req.file ? req.file.path : '';
    let parametroAxios1, parametroAxios2;
    if (req.body.A != undefined){
        if ((req.body.A.toString()).indexOf(",") < 1)
            arrayAtributo.push({ A: req.body.A});
        else{
            for (let index = 0; index < req.body.A.length ; index++)
                arrayAtributo.push({ A: req.body.A[index] });
        }
        
    }
    parametroAxios1  = { campo: arrayAtributo };
    // AJUSTAR IDUSUARIO DEPOIS
    parametroAxios2 = {
        idInstituicao : req.body.seletor,
        link          : aux,
        dataExame     : req.body.dataExame,
        idTipoExame   : req.body.idTipoExame
    };

    axios.all([
        axios.post('http://localhost:3000/campoParametro', parametroAxios1),
        axios.post('http://localhost:3000/exames', parametroAxios2)
    ]).then(axios.spread(function (respCampoParametros, respExame) {
            if (respExame.status == 200) {
                let arrayParamets = [];
                if (req.body.At == undefined && req.body.A == undefined)
                    arrayParamets = null;
                else{
                    if (req.body.At != undefined) {
                        if ((req.body.At.toString()).indexOf(",") < 1)
                            arrayParamets.push({ idA: req.body.At, V: req.body.Vt });
                        else {
                            for (let index = 0; index < req.body.At.length; index++)
                                arrayParamets.push({ idA: req.body.At[index], V: req.body.Vt[index] })
                        }
                    }
                    if (req.body.A != undefined) {
                        if ((req.body.A.toString()).indexOf(",") <= 1)
                            arrayParamets.push({ idA: respCampoParametros.data[0].campo, V: req.body.V });
                        else {
                            for (let index = 0; index < respCampoParametros.data.length; index++)
                                arrayParamets.push({ idA: respCampoParametros.data[index].campo, V: req.body.V[index] });
                        }
                    }
                }
                axios.post('http://localhost:3000/parametroExame',
                    {
                        idExame: respExame.data.id,
                        arrayParamets
                    }
                ).then(function (respon) {
                    if (respon.status == 200) {
                        res.redirect('/tipoExame');
                    }
                }).catch(error => {console.log(error)});
            }
    })).catch(error => {console.log(error)});
});

router.post('/InstExameExistente', multer(multerConfig).single('file'), function (req, res) {
    
    // Variaveis para o axios
    const arrayAtributo = [];
    let aux = req.file ? req.file.path : '';
    let parametroAxios1, parametroAxios2;
    if (req.body.A != undefined) {
        if ((req.body.A.toString()).indexOf(",") < 1)
            arrayAtributo.push({ A: req.body.A });
        else {
            for (let index = 0; index < req.body.A.length; index++)
                arrayAtributo.push({ A: req.body.A[index] });
        }
    }
    parametroAxios1 = { campo: arrayAtributo };
    // AJUSTAR IDUSUARIO DEPOIS
    parametroAxios2 = {
        cidade : req.body.cidade,
        cep    : req.body.cep,
        bairro : req.body.bairro,
        rua    : req.body.rua,
        numero : req.body.numero
    }

    axios.all([
        axios.post('http://localhost:3000/campoParametro', parametroAxios1),
        axios.post('http://localhost:3000/localidade', parametroAxios2)
    ]).then(axios.spread(function (respCampoParametros, respLocal) {
        if(respLocal.status == 200){

            axios.post('http://localhost:3000/instituicao/', {
                nome: req.body.nomeInstituicao,
                idLocal: respLocal.data.id,
                idUsuario: 1
            }).then(function (respInst) {
                if(respInst.status == 200){
                    parametroAxios2 = {
                        idInstituicao: respInst.data.id,
                        link: aux,
                        dataExame: req.body.dataExame,
                        idTipoExame: req.body.idTipoExame
                    };
                    axios.post(
                        'http://localhost:3000/exames', parametroAxios2
                    ).then(function (respExame) {
                        if (respExame.status == 200) {
                            let arrayParamets = [];
                            if (req.body.At == undefined && req.body.A == undefined)
                                arrayParamets = null;
                            if (req.body.At != undefined) {
                                if ((req.body.At.toString()).indexOf(",") < 1)
                                    arrayParamets.push({ idA: req.body.At, V: req.body.Vt });
                                else {
                                    for (let index = 0; index < req.body.At.length; index++)
                                        arrayParamets.push({ idA: req.body.At[index], V: req.body.Vt[index] })
                                }
                            }
                            if (req.body.A != undefined) {
                                if ((req.body.A.toString()).indexOf(",") <= 1)
                                    arrayParamets.push({ idA: respCampoParametros.data[0].campo, V: req.body.V });
                                else {
                                    for (let index = 0; index < respCampoParametros.data.length; index++)
                                        arrayParamets.push({ idA: respCampoParametros.data[index].campo, V: req.body.V[index] });
                                }
                            }
                            axios.post('http://localhost:3000/parametroExame',
                                {
                                    idExame: respExame.data.id,
                                    arrayParamets
                                }
                            ).then(function (respon) {
                                if (respon.status == 200)
                                    res.redirect('/tipoExame');
                            }).catch(error => {console.log(error)});
                        }
                    }).catch(error => {console.log(error)});
                }
            }).catch(error => {console.log(error)}); 
        }
    })).catch(error => {console.log(error)});
});

router.post('/editar/', function (req, res, next) {
    axios.put('http://localhost:3000/tipoExame/', {
        idTipoExame   : req.body.id,
        novoNomeExame : req.body.nomeNovo,
        idUsuario : 1
    }).then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        if (response.status == 200) {
            res.redirect('/tipoExame');
        }
    }).catch(error => {
        
    });
});

router.post('/del/', function (req, res, next) {
    axios.delete('http://localhost:3000/tipoExame/', {
        data: {
            id: req.body.id
        }
    }).then(function (response) {
        console.log(response.data); // ex.: { user: 'Your User'}
        if (response.status == 200) {
            res.redirect('/tipoExame');
        }
    }).catch(error => {
       
    });
});


module.exports = router;