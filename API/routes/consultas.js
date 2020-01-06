var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc';


//Convertendo binario em arquivo
function base64_decode(base64str, fileName) {
	var bitmap = new Buffer(base64str, 'base64');
	fs.writeFileSync('src/temp/' + fileName + '', bitmap, 'binary', function (err) {
		if (err) {
			console.log('Conversao com erro');
		}
	});
}

//Convertendo arquivo em binário
function base64_encode(fileName) {
	var bitmap = fs.readFileSync('src/temp/' + fileName + '');
	return new Buffer(bitmap).toString('base64');
}

router.get('/', function (req, res, next) {
	var sql;
	let aux = [];
	const connection = mysql.createConnection(consMysql);
	if (req.query.id) {
		aux.push(req.query.id);
		sql = "SELECT * FROM Consulta WHERE id_usuario = ? ORDER BY diagnostico";
		connection.query(sql, aux, function (error, results, next) {

			if (error) {
				console.log(error);
				return res.status(304).end();
			}
			return res.status(200).json(results);
		});
	} 
	if (req.query.busca && req.query.usu) {
		console.log("aqui ele passou");
		console.log(req.query.busca + " = " + req.query.usu);
		aux.push(req.query.busca);
		aux.push(req.query.usu);
		sql = "SELECT * FROM Consulta WHERE id LIKE ? AND id_usuario LIKE ?";
		connection.query(sql, aux, function (error, results, next) {

			if (error) {
				console.log(error);
				return res.status(304).end();
			}
			console.log(results[0]);
			return res.status(200).json(results[0]);
		});
	}
});

router.post('/',function (req, res, next) {
	let consulta = [];
	consulta.push(req.body.diagnostico);
	consulta.push(req.body.prescricao);
	consulta.push(req.body.nome_medico);
	consulta.push(req.body.id_usuario);
	consulta.push(req.body.id_instituicao);
	consulta.push(null);

	const connection = mysql.createConnection(consMysql);
	var sql = "INSERT INTO Consulta (diagnostico,prescricao,nome_medico,id_usuario,id_instituicao) VALUES (?,?,?,?,?)";
	connection.query(sql, consulta, function (error, result) {
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
	let consulta = [];
	consulta.push(req.params.id);
	const connection = mysql.createConnection(consMysql);
	let sql = "DELETE FROM Consulta WHERE id = ?";
	connection.query(sql, consulta, function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		let resposta = results[0];
		return res.status(200).send(resposta);
	});
});

router.put('/', function (req, res,next) {
	var consulta = [];
	console.log(req.body.id_instituicao);
	consulta.push(req.body.diagnostico);
	consulta.push(req.body.prescricao);
	consulta.push(req.body.nome_medico);
	consulta.push(req.body.id_instituicao);
	consulta.push(req.body.id);
	consulta.push(req.body.id_usuario);

	const connection = mysql.createConnection(consMysql);
	var sql = "UPDATE Consulta SET diagnostico=?, prescricao=?, nome_medico=?, id_instituicao=? WHERE id=? AND id_usuario=?";
	connection.query(sql, consulta, function (error, results) {
		if (error) {
			return res.status(304).end();
		}
		let resposta = results[0];
		return res.status(200).json(resposta);
	});
});

module.exports = router;