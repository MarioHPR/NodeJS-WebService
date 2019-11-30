var express = require('express');
var router = express.Router();
var app = express();

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc';

router.post('/', function (req, res, next) {
    let instituicao = [];
    instituicao.push(req.body.nome);
    instituicao.push(req.body.id_local);
    var sql = "INSERT INTO Instituicao (nome,id_local) VALUES (?,?)";
    connection.query(sql, instituicao, function (error, result) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }
        let resposta = { id: result.insertId };
        console.log(resposta);
        return res.status(201).json(resposta);
    });
});

router.delete('/:id', function (req, res, next) {
    let instituicao = [];
    instituicao.push(req.params.id);
    const connection = mysql.createConnection(consMysql);
    let sql = "DELETE FROM Instituicao WHERE id = ?";
    connection.query(sql, instituicao, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        let resposta = results[0];
        return res.status(200).send(resposta);
    });
});

router.put('/:id', function (req, res) {// fazer ainda tirar duvida com Prof. Carlos
    let instituicao = [];
    instituicao.push(req.body.nome);
    instituicao.push(req.body.id_local);
    instituicao.push(req.body.id);

    const connection = mysql.createConnection(consMysql);
    connection.query("UPDATE Instituicao SET nome=? ,id_local=? WHERE id = ?", instituicao, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        let resposta = results[0];
        return res.status(200).send(resposta);
    });
});

module.exports = router;