var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express();
var consMysql = 'mysql://root:@localhost:3306/bancoTcc2';

router.get('/', function (req, res, next) {
    console.log("entrou aqui no parametros");
    console.log(req.query.idExame);

    var sql = 'SELECT id,campo,valor FROM parametros WHERE idExame = ?';

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, [req.query.idExame], function (error, results) {
        if (error) {
            console.log(error);
            return res.status(304).end();
        }
        console.log(results);
        return res.status(200).json(results);
    });
    connection.end();
});

router.post('/', function (req, res) {
    
    if (req.body.campo.length == 0){
        return res.status(200).json("");
    }
    idCampos = [];
    const arrayParametros = req.body.campo.map(parametros => [parametros.A]);
    const values = arrayParametros.map(() => "(?)");
    const connection = mysql.createConnection(consMysql);

    connection.query("INSERT INTO CampoParametro (campo) VALUES " + values.join(","), arrayParametros, async function (error, results) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }
        let inicio = results.insertId;
        let fim = results.insertId + results.affectedRows;
        for (let i = inicio; i < fim; i++)
            idCampos.push({ campo: i });
       
        return res.status(200).json(idCampos);
    });
    connection.end();
});

module.exports = router;