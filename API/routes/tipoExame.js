var express = require('express');
var router  = express.Router();
var app     = express();

var mysql     = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc2';

router.get('/', function (req, res, next) {
    var sql = 'SELECT tipoExame.id, tipoExame.nomeExame, COUNT(tipoExame.id) AS quantidade FROM tipoExame LEFT JOIN Exame on tipoExame.id = Exame.idTipoExame WHERE tipoExame.idUsuario = ? GROUP BY tipoExame.nomeExame;';

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, [req.query.idUsuario], async function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        
        return res.status(200).json(results);
    });
    connection.end();
});

router.post('/', function (req, res) {

    let tipoExame = [];
    tipoExame.push(req.body.nomeExame);
    tipoExame.push(req.body.idUsuario);

    const connection = mysql.createConnection(consMysql);
    var sql = "INSERT INTO tipoExame (nomeExame,idUsuario) VALUES (?,?)";

    connection.query(sql, tipoExame, function (error, result) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }
        let resposta = { id: result.insertId };
        console.log(resposta);
        return res.status(200).json(resposta);
    });
});

router.delete('/', function (req, res, next) {
    let tipoExame = [];
    tipoExame.push(req.body.id);
    let sql = "DELETE FROM tipoExame WHERE id = ?;";

    const connection = mysql.createConnection(consMysql);
    
    connection.connect();
    connection.query(sql, tipoExame, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        return res.status(200).send(results);
    });

});

router.put('/', function (req, res, next) {
    var tipoExame = [];
    tipoExame.push(req.body.novoNomeExame);
    tipoExame.push(req.body.idTipoExame);
    tipoExame.push(req.body.idUsuario)

    const connection = mysql.createConnection(consMysql);
    var sql = "UPDATE tipoExame SET nomeExame= ? WHERE id= ? AND idUsuario= ?";
    connection.query(sql, tipoExame, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        let resposta = results[0];
        return res.status(200).json(resposta);
    });
});

module.exports = router;