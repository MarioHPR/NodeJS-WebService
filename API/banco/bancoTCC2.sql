DROP DATABASE bancoTcc2;
create database if not exists bancoTcc2;
use bancoTcc2;

CREATE TABLE IF NOT EXISTS Contato(
	id          INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ddd         INTEGER,
    telefone    VARCHAR(12),
	email       VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS Localidade (
	id          INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	cidade      VARCHAR(20),
    cep			VARCHAR(10),	
    bairro      VARCHAR(20),	
    rua         VARCHAR(50),
    numero	 	INTEGER
);

CREATE TABLE IF NOT EXISTS Usuario (
	 id 			INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
     cpf 			VARCHAR(11) NOT NULL UNIQUE,
     nome 			VARCHAR(60) NOT NULL,
     dataNascimento DATE NOT NULL,
     usuario 		VARCHAR(10) NOT NULL UNIQUE,
	 senha   		VARCHAR(10),
     idContato 		INTEGER,
     idLocal 		INTEGER,
     
     FOREIGN KEY (idContato)
		REFERENCES Contato (id),
	 FOREIGN KEY (idLocal)
		REFERENCES Localidade (id)
);
-- insert into Instituicao (nome,idLocal,idUsuario) value ('teste inst',1,1);
CREATE TABLE IF NOT EXISTS Instituicao (
	id		   INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome 	   VARCHAR(50) NOT NULL UNIQUE,
    idLocal    INTEGER NOT NULL,
    idUsuario  INTEGER NOT NULL,
    
    FOREIGN KEY (idLocal)
		REFERENCES Localidade (id),
	FOREIGN KEY (idUsuario)
		REFERENCES usuario (id)
);
-- insert into Consulta (diagnostico,prescricao,nomeMedico,dataConsulta,idUsuario,idInstituicao) value ("gripe","descansar","Dr Mario",'1999-01-01',1,1);
CREATE TABLE IF NOT EXISTS Consulta (
	id 				INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	diagnostico 	VARCHAR(100) NOT NULL,
    prescricao  	VARCHAR(300) NOT NULL,
    nomeMedico  	VARCHAR (15),
    linkImage  	    VARCHAR(300),
    dataConsulta    date NOT NULL,
	idUsuario 		INTEGER NOT NULL,
    idInstituicao	INTEGER NOT NULL,
    
    FOREIGN KEY (idUsuario)
		REFERENCES Usuario (id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	FOREIGN KEY (idInstituicao)
		REFERENCES Instituicao (id)
);

CREATE TABLE IF NOT EXISTS tipoExame (
	id        INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,	
    nomeExame VARCHAR(30) NOT NULL UNIQUE,
    idUsuario INTEGER NOT NULL,
    
	FOREIGN KEY (idUsuario)
		REFERENCES Usuario (id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Exame (
	id             INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idInstituicao  INTEGER NOT NULL,
    linkImage      VARCHAR(300),
    dataExame	   date NOT NULL,
    idTipoExame    INTEGER NOT NULL,
    
	FOREIGN KEY (idInstituicao)
		REFERENCES Instituicao (id),
	FOREIGN KEY (idTipoExame)
		REFERENCES tipoExame (id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS CampoParametro (
	id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    campo VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS ParametroExame (
	id 	  INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    valor VARCHAR(400),
	idExame   INTEGER NOT NULL,
    idCampo INTEGER,
    
    FOREIGN KEY (idExame)
		REFERENCES Exame (id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
	FOREIGN KEY (idCampo)
		REFERENCES CampoParametro (id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
);


-- /////////////////////////////////////////////////////-- /////////////////////////////////////////////////////
SELECT CampoParametro.id,campo, valor, idInstituicao, Instituicao.nome, Exame.linkImage,Exame.dataExame, Exame.id AS idExame
	from CampoParametro INNER JOIN 
        ParametroExame ON CampoParametro.id = ParametroExame.idCampo RIGHT JOIN 
        Exame ON Exame.id = ParametroExame.idExame INNER JOIN Instituicao ON Exame.idInstituicao = Instituicao.id  INNER JOIN 
        TipoExame ON TipoExame.id = Exame.idTipoExame
			WHERE TipoExame.id = 1;  
-- /////////////////////////////////////////////////////-- ///////////////////////////////////////////////////// */  

-- insert teste
insert INTO Localidade (cidade, cep, bairro, rua, numero) value ("sao jeo","96700000","bairro tal","rua tal","111"),("Charq","96700000","bairro charq","rua charq","171");
insert into contato (ddd,telefone,email) value (51,"998379633","mariopereira398@gmail.com");
insert into Usuario (cpf, nome, dataNascimento, usuario, senha, idContato, idLocal)	value ('02636414061',"Mario","1993-10-26","adm","1",1,1);
insert into instituicao (nome, idLocal,idUsuario) value ("Consultorio", 1,1),("Hospital", 2,1);
insert into tipoExame (nomeExame, idUsuario) value("Hemograma",1);
insert into tipoExame (nomeExame, idUsuario) value("RaioX",1);
insert into Exame (idInstituicao,dataExame,idTipoExame) value (1,'2020-03-25',1),(2,'2020-03-25',1);
insert into Exame (idInstituicao,dataExame,idTipoExame) value (2,'2018-03-25',2);
insert into campoParametro (campo) value ("glob branco"),("glob vermelho"),("hemacia"),("plaquetas"),("gob pls"),("braço");
insert into ParametroExame (idCampo,valor,idExame) value (1,"34,7",1),(2,"35,7",1),(3,"34,7",2),(4,"35,7",2),(5,"35,7",2),(6,"Fratura",3);
insert into Exame (idInstituicao,dataExame,idTipoExame) value (2,'1998-03-02',1);
insert into ParametroExame (idCampo,valor,idExame) value (1,"39,5",4),(2,"40,7",4),(3,"20,7",4),(4,"20,74",4);

-- DELETE FROM tipoExame WHERE id = 2;
-- use bancoTcc2;
-- SELECTS
-- NOVOS

select * from consulta;
SELECT * FROM Consulta WHERE idUsuario = 1 ORDER BY diagnostico;
select * from ParametroExame;
SELECT * FROM CampoParametro;
select * FROM  ParametroExame WHERE ParametroExame.idExame  in  (select id from Exame where id =1);
        
        
SELECT CampoParametro.id,campo, valor, idInstituicao, idExame 
	FROM CampoParametro INNER JOIN ParametroExame ON CampoParametro.id = ParametroExame.idCampo 
		INNER JOIN Exame ON Exame.id = ParametroExame.idExame 
		INNER JOIN TipoExame ON TipoExame.id = Exame.idTipoExame 
			WHERE TipoExame.id = 2 ORDER BY CampoParametro.id;
        
SELECT * 
	FROM CampoParametro INNER JOIN ParametroExame ON CampoParametro.id = ParametroExame.idCampo 
		INNER JOIN Exame ON Exame.id = ParametroExame.idExame 
		INNER JOIN TipoExame ON TipoExame.id = Exame.idTipoExame 
			WHERE TipoExame.id = 2 and exame.id = 1 ORDER BY idExame;  
            
select * from Exame inner join ParametroExame on Exame.id = ParametroExame.idExame where Exame.idTipoExame = 2;

SELECT *  FROM Exame INNER JOIN Instituicao ON Exame.idInstituicao =Instituicao.id  WHERE Exame.idTipoExame = 2;

SELECT  DISTINCT CampoParametro.id, CampoParametro.campo
	FROM Exame INNER JOIN ParametroExame ON Exame.id = ParametroExame.idExame INNER JOIN CampoParametro
		ON ParametroExame.idCampo = CampoParametro.id WHERE Exame.idTipoExame = 1 ORDER BY CampoParametro.id;
        
SELECT Exame.idInstituicao,CampoParametro.id AS idCampoParametro, CampoParametro.campo,ParametroExame.id AS idParametro, ParametroExame.valor 
	from CampoParametro INNER JOIN ParametroExame ON CampoParametro.id = ParametroExame.idCampo 
		INNER JOIN Exame ON Exame.id = ParametroExame.idExame INNER JOIN TipoExame ON TipoExame.id = Exame.idTipoExame
			WHERE TipoExame.id = 1;
            
SELECT distinct  CampoParametro.id, campo, valor, idInstituicao, idExame
	from CampoParametro INNER JOIN ParametroExame ON CampoParametro.id = ParametroExame.idCampo 
		INNER JOIN Exame ON Exame.id = ParametroExame.idExame INNER JOIN TipoExame ON TipoExame.id = Exame.idTipoExame
			WHERE TipoExame.id = 1 ORDER BY CampoParametro.campo;
         
            
            
SELECT Exame.id, nome, idInstituicao, linkImage, dataExame FROM Exame INNER JOIN Instituicao ON Exame.idInstituicao =Instituicao.id  WHERE Exame.idTipoExame = 1;
select * from exame;
select * from ParametroExame where ParametroExame.idExame = 9;
 -- /////////////////////////////////////////////////////       
SELECT * FROM Localidade INNER JOIN Instituicao ON Localidade.id = Instituicao.idLocal WHERE Instituicao.id IN ((1),(2),1);
SELECT * FROM Exame INNER JOIN Instituicao ON Exame.idInstituicao =Instituicao.id  WHERE Exame.idTipoExame = 2;
SELECT * FROM Exame INNER JOIN Instituicao ON Exame.idInstituicao =Instituicao.id  WHERE Exame.idTipoExame = 1;
select ParametroExame.campo as campo, ParametroExame.valor as valor
	from  tipoExame inner join  exame inner join ParametroExame on tipoExame.id = exame.idTipoExame and exame.id = ParametroExame.idExame where  tipoExame.idUsuario = 1;
SELECT tipoExame.id, tipoExame.nomeExame, COUNT(tipoExame.id) AS idInstituicao FROM tipoExame LEFT JOIN Exame on tipoExame.id = Exame.idTipoExame WHERE tipoExame.idUsuario =1 GROUP BY tipoExame.nomeExame;