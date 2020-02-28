var express = require('express');
var router = express.Router();
var app = express();

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc';

router.get('/', function (req, res, next) {
    var sql = 'SELECT * FROM Instituicao WHERE id_usuario = ?';

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, [req.query.id_usuario], function (error, results) {
        if (error) {
            console.log(error); 
            return res.status(304).end();
        }
        return res.status(200).json(results);
    });
    connection.end();
});

router.get('/visu', function (req, res, next) {
    console.log("enroeoedlkemcoi")
    console.log(req.query)
    let objeto = [];
    objeto.push(req.query.idExame);
    objeto.push(req.query.idUsuario);
    objeto.push(req.query.idInstituicao);

    var sql = 'SELECT  Exames.nome_exame AS exame,Exames.linkImage, Instituicao.nome AS instituicao FROM  Exames INNER JOIN Instituicao WHERE Exames.id = ? AND Exames.id_usuario = ? AND Instituicao.id = ?;';
    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, objeto, function (error, results) {
        if (error) {
            console.log(error);
            return res.status(304).end();
        }
        console.log(results);
        return res.status(200).json(results);
    });
    connection.end();
});

router.post('/', function (req, res, next) {
    let instituicao = [];
    instituicao.push(req.body.nome);
    instituicao.push(req.body.id_local);
    instituicao.push(req.body.id_usuario);
    const connection = mysql.createConnection(consMysql);
    var sql = "INSERT INTO Instituicao (nome,id_local,id_usuario) VALUES (?,?,?)";
    connection.query(sql, instituicao, function (error, result) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }
        let resposta = { "id": result.insertId };
        return res.status(200).json(resposta);
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