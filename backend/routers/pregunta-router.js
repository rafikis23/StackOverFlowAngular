var express = require('express');
var router = express.Router();
var pregunta = require('../models/pregunta');
var mongoose = require('mongoose');
// Obtener el detalle de una pregunta en especifico
router.get('/:idPregunta/detalle', function(req, res){
    pregunta.aggregate([
        {
            $lookup:{
                from: "usuarios",
                localField:"_idUsuario",
                foreignField:"_id",
                as: "usuarios"
            }
        },
        {
            $match:{
                "_id":mongoose.Types.ObjectId(req.params.idPregunta)
            }
        },
        {
            $project:{
                "titulo":true,
                "descripcion":true,
                "fecha":true,
                "votos":true,
               "hashtags":true,
               "usuarios._id":true,
               "usuarios.nombre":true,
               "usuarios.urlImagen":true
            }
        }
    ])
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    })
});
// Obtener los detalles de las respuesta de una pregunta en especifico
router.get('/:idPregunta/respuestas', function(req, res){
    pregunta.aggregate([
        {
            $lookup:{
                from: "usuarios",
                localField:"respuestas._idUsuario",
                foreignField:"_id",
                as: "usuarios"
            }
        },
        {
            $match:{
                "_id":mongoose.Types.ObjectId(req.params.idPregunta)
            }
        },
        {
            $project:{
               "respuestas._id":true,
               "respuestas.descripcion":true,
               "respuestas.fecha":true,
               "respuestas.votos":true,
               "respuestas._idUsuario":true,
               "usuarios._id":true,
               "usuarios.nombre":true,
               "usuarios.urlImagen":true
            }
        }
    ])
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    })
});

//Obtener las preguntas de todos los usuarios
// Agregar el detalle y respuestas de cada pregunta
// Agregar un nueva pregunta segun el usuario seleccionado
router.post('/:idPregunta/usuario/:idUsuario/detalle/:tituloPregunta', function(req, res) {
    pregunta.create({
        _id:mongoose.Types.ObjectId(req.params.idPregunta),
        titulo:req.params.tituloPregunta,
        descripcion:req.body.descripcion,
        fecha:req.body.fecha,
        votos:req.body.votos,
        vistas:req.body.vistas,
        hashtags: req.body.hashtags,
        _idUsuario:mongoose.Types.ObjectId(req.params.idUsuario),
        respuestas:req.body.respuestas
    }).then(resultado => {
        res.send(resultado);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})

module.exports = router;