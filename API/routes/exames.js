var express = require('express');
var router = express.Router();
var app = express();

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc2';

/* GET home page. */
router.get('/', function (req, res, next) {

	var sql = 'SELECT Exame.id, nome, idInstituicao, linkImage, dataExame FROM Exame INNER JOIN Instituicao ON Exame.idInstituicao =Instituicao.id  WHERE Exame.idTipoExame = ?;';

	const connection = mysql.createConnection(consMysql);
	connection.connect();
	connection.query(sql, [req.query.idTipoExame], function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		return res.status(200).json(results);
	});
	connection.end();
});

router.post('/', function (req, res) {
	
	let exame = [];
	exame.push(req.body.idInstituicao);
	exame.push(req.body.link);
	exame.push(req.body.dataExame);
	exame.push(req.body.idTipoExame);

	const connection = mysql.createConnection(consMysql);
	var sql = "INSERT INTO Exame (idInstituicao,linkImage,dataExame,idTipoExame) VALUES (?,?,?,?)";
	connection.query(sql, exame, function (error, result) {
		if (error) {
			//console.log(error)
			return res.status(304).end();
		}
		let resposta = { id: result.insertId };
		console.log(resposta);
		return res.status(200).json(resposta);
	});
	connection.end();
});

router.delete('/:id', function (req, res, next) {
	let usuario = [];
	usuario.push(req.params.id);
	const connection = mysql.createConnection(consMysql);
	let sql = "DELETE FROM Exames WHERE id = ?";
	connection.query(sql, usuario, function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		let resposta = results[0];
		return res.status(200).send(resposta);
	});
	connection.end();
});

router.put('/:id', function (req, res) {// fazer ainda tirar duvida com Prof. Carlos
	let cliente = [];
	cliente.push(req.body.nome);
	cliente.push(req.body.email);
	cliente.push(req.body.telefone);
	cliente.push(req.params.id);

	const connection = mysql.createConnection(consMysql);
	connection.query("UPDATE TABELA SET nome=? ,email=? ,telefone=? WHERE id = ?", cliente, async function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		let resposta = results[0];
		return res.status(200).send(resposta);
	});
	connection.end();
});

module.exports = router;