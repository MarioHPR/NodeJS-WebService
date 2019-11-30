var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/bancoTcc';

//router.get('/:id')...

router.post('/', function(req, res, next) {
    let usuario =[];
    let sql;
    console.log('api')
    usuario.push(req.body.cpf);
    usuario.push(req.body.nome);
    usuario.push(req.body.dataNascimento);
    usuario.push(req.body.usuario);
    usuario.push(req.body.senha);
    const connection = mysql.createConnection(consMysql);
    sql = "INSERT INTO Usuario (cpf,nome,dataNascimento,usuario,senha) VALUES (?,?,?,?,?)";
    connection.query(sql, usuario, function(error, result){
      if (error) {
        console.log(error)
        return res.status(304).end();
      }	
      let resposta = { id: result.insertId };
      console.log(resposta);
      return res.status(201).location('http://').json(resposta);
    });
  });

  router.put('/:id', function(req,res) {
    let usuario =[];
    usuario.push(req.body.nome);
    usuario.push(req.body.dataNascimento);
    usuario.push(req.params.usuario);
    usuario.push(req.body.senha);
    usuario.push(req.body.cpf);
    usuario.push(req.params.id);
  
    let sql = "UPDATE Usuario SET nome=? ,dataNascimento=? ,usuario=?, senha=? WHERE cpf = ? AND id = ?";
    
    const connection = mysql.createConnection(consMysql);
    connection.query(sql, usuario, function(error, results){
      if (error) {
        return res.status(304).end();
      }	
          let resposta = results[0];
      return res.status(200).send(resposta);
    });
  })


module.exports = router;
