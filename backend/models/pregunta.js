const { Mixed, Schema } = require('mongoose');
var mongoose = require('mongoose');
const usuario = require('./usuario');

var esquema = new mongoose.Schema({
        titulo: String,
        descripcion: String,
        fecha: String,
        votos: {type: Number, min:0},
        vistas: {type: Number, min:0},
        hashtags: Array,
        _idUsuario: Schema.Types.ObjectId,
        respuestas: Mixed
            
    
    
});


module.exports = mongoose.model('preguntas', esquema);