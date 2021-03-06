var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc2';


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

	aux.push(req.query.idUsuario);
	sql = "SELECT * FROM Consulta WHERE idUsuario = ? ORDER BY diagnostico;";
	connection.query(sql, aux, function (error, results, next) {
		if (error) {
			console.log(error);
			return res.status(304).end();
		}	

		return res.status(200).json(results);
	});
});

router.get('/visu', function (req, res, next) {
	console.log("entro nessa bagaca ")
	console.log(req.query)
	let objeto = [];
	objeto.push(req.query.idConsulta);
	objeto.push(req.query.idUsuario);
	objeto.push(req.query.idInstituicao);

	var sql = 'SELECT  Consulta.diagnostico,Consulta.prescricao,Consulta.nome_medico,Consulta.link_image,Instituicao.nome AS instituicao FROM  Consulta INNER JOIN Instituicao ON Consulta.id_instituicao = Instituicao.id WHERE Consulta.id = ? AND Consulta.id_usuario = ? AND Instituicao.id = ?;';
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

router.post('/',function (req, res, next) {
	
	let consulta = [];

	consulta.push(req.body.diagnostico);
	consulta.push(req.body.prescricao);
	consulta.push(req.body.nomeMedico);
	consulta.push(req.body.linkImage);
	consulta.push(req.body.dataConsulta);
	consulta.push(req.body.idUsuario);
	consulta.push(req.body.idInstituicao);

	const connection = mysql.createConnection(consMysql);
	var sql = "INSERT INTO Consulta (diagnostico,prescricao,nomeMedico,linkImage,dataConsulta,idUsuario,idInstituicao) VALUES (?,?,?,?,?,?,?)";
	connection.query(sql, consulta, function (error, result) {
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

	let consulta = [];
	consulta.push(req.body.id);
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