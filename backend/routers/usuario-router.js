var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var mongoose = require('mongoose');
// Obtener los usuarios
router.get('/', function(req, res){
    usuario.find({},{_id:true, nombre:true, urlImagen:true})
    .then((data)=>{
        res.send(data);
        res.end();

    })
    .catch((error)=>{
        res.send(error);
        res.end();
    })
});

//Obtener las preguntas de todos los usuarios
router.get('/preguntasUsuario', function(req, res){
    usuario.aggregate([
        {
            $lookup:{
                from: "preguntas",
                localField:"preguntas._id",
                foreignField:"_id",
                as: "preguntas"
            }
        },
        {
            $match:{
            }
        },
        {
            $project:{
                "_id":true,
                "nombre":true,
                "urlImagen":true,
                "preguntas._id":true,
                "preguntas.titulo":true,
                "preguntas.fecha":true,
                "preguntas.votos":true,
                "preguntas.vistas":true,
                "preguntas.hashtags":true,
                "preguntas.respuestas._id":true
            }
        }
    ])
    .then((data)=>{
        res.send(data);
        res.end();

    })
    .catch((error)=>{
        res.send(error);
        res.end();
    })
});

// Agregar un nueva pregunta segun el usuario seleccionado
router.post('/:idUsuario/nuevaPregunta', function(req, res) {
    usuario.update({
        _id: mongoose.Types.ObjectId(req.params.idUsuario)
    }, {
        $push: {
            preguntas: {
                _id: mongoose.Types.ObjectId(),
                titulo: req.body.titulo
            }
        }
    }).then(resultado => {
        res.send(resultado);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})

module.exports = router;