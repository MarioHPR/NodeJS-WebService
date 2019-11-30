var express = require('express');
var router = express.Router();
var app = express();

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc';

router.post('/', function (req, res, next) {
	usuario.push(req.body.diagnostico);
	usuario.push(req.body.prescricao);
	usuario.push(req.body.cpf_usuario);
	usuario.push(req.body.crm_medico);
	usuario.push(req.body.id_local);
	var sql = "INSERT INTO Consulta (diagnostico,prescricao,cpf_usuario,crm_medico,id_local) VALUES (?,?,?,?,?)";
	connection.query(sql, usuario, function (error, result) {
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
	let usuario = [];
	usuario.push(req.params.id);
	const connection = mysql.createConnection(consMysql);
	let sql = "DELETE FROM Consulta WHERE id = ?";
	connection.query(sql, usuario, function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		let resposta = results[0];
		return res.status(200).send(resposta);
	});
});

router.put('/:id', function (req, res) {// fazer ainda tirar duvida com Prof. Carlos
	let cliente = [];
	cliente.push(req.body.nome);
	cliente.push(req.body.email);
	cliente.push(req.body.telefone);
	cliente.push(req.params.id);

	const connection = mysql.createConnection(consMysql);
	connection.query("UPDATE TABELA SET nome=? ,email=? ,telefone=? WHERE id = ?", cliente, function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		let resposta = results[0];
		return res.status(200).send(resposta);
	});
});

module.exports = router;