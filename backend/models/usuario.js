const { Mixed } = require('mongoose');
var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
        nombre: String,
        urlImagen: String,
        preguntas: Mixed
    
});


module.exports = mongoose.model('usuarios', esquema);