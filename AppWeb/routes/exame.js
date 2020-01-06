var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    // Requisições do tipo GET
    axios.get('http://localhost:3000/exames', {
        params: {
            id_usuario : 1 
        }
    }).then(function (response) {
        if (response.status == 201) {
            console.log(response.data );
            res.render('usuario/exame', { exames : response.data });
        }
    }).catch(error => {});
});

router.get('/add', function (req, res, next) {
    res.render('usuario/addExame');
});



module.exports = router;