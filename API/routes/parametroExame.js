var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express();
var consMysql = 'mysql://root:@localhost:3306/bancoTcc2';

router.get('/', function (req, res, next) {
 
    var sql = 'SELECT id,campo,valor FROM parametros WHERE id_exame = ?';

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
    let sql;
    let arrayParametros;
    let values;
    if (req.body.arrayParamets == null && req.body.idExame == null) {
        return res.status(200).json("");
    }
    
    if (req.body.arrayParamets == null){
        arrayParametros = req.body.idExame;
        sql = "INSERT INTO ParametroExame (idExame) VALUES (?)" ;
    }
    else{
        arrayParametros = req.body.arrayParamets.map(parametros => [parametros.idA, parametros.V, req.body.idExame])
        values = arrayParametros.map(() => "(?)");
        sql    = "INSERT INTO ParametroExame (idCampo,valor,idExame) VALUES " + values.join(",");
    }
    const connection = mysql.createConnection(consMysql);
    connection.query(sql, arrayParametros, async function (error, results) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }

        console.log(results)

        return res.status(200).json(results);
    });
});

module.exports = router;