const { Mixed } = require('mongoose');
var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
        titulo: String,
        descripcion: String,
        fecha: String,
        votos: String,
        vistas: String,
        hashtags: Array,
        respuestas: Mixed
            
    
    
});


module.exports = mongoose.model('preguntas', esquema);