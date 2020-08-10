var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express();
var consMysql = 'mysql://root:@localhost:3306/bancoTcc2';

router.get('/', function (req, res, next) {
    let sql;

    //var sql = 'SELECT CampoParametro.id AS idCampoParametro, CampoParametro.campo,ParametroExame.id AS idParametro, ParametroExame.valor from CampoParametro inner join ParametroExame on CampoParametro.id = ParametroExame.idCampo WHERE ParametroExame.idExame = ?;';
    //var sql = 'SELECT CampoParametro.id,campo, valor, idInstituicao, idExame FROM CampoParametro INNER JOIN ParametroExame ON CampoParametro.id = ParametroExame.idCampo INNER JOIN Exame ON Exame.id = ParametroExame.idExame INNER JOIN TipoExame ON TipoExame.id = Exame.idTipoExame WHERE TipoExame.id = ? ORDER BY CampoParametro.id;'
    sql = 'SELECT CampoParametro.id,campo, valor, idInstituicao, Instituicao.nome, Exame.linkImage,Exame.dataExame, Exame.id AS idExame';
    sql += ' FROM CampoParametro INNER JOIN ParametroExame ON CampoParametro.id = ParametroExame.idCampo';
    sql += ' RIGHT JOIN Exame ON Exame.id = ParametroExame.idExame';
    sql += ' INNER JOIN Instituicao ON Exame.idInstituicao = Instituicao.id';
    sql += ' INNER JOIN tipoExame ON tipoExame.id = Exame.idTipoExame WHERE tipoExame.id = ?;'

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, [req.query.idTipoExame], function (error, results) {
        if (error) {
            console.log(error);
            return res.status(304).end();
        }

        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH")
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH")
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH")
        console.log(results)
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH")
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH")
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHH")
       
        return res.status(200).json(results);
    });
    connection.end();
});

module.exports = router;