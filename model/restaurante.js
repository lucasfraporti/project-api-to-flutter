const mongoose = require('mongoose');

const restauranteSchema = new mongoose.Schema({
    nomeAtendente: String,
    nomeCliente: String,
    numberMesa: Number,
    mesaLimpa: Number,
    mesaOcupada: Number
},
{
    versionKey: false
});

/*
0: Mesa não está ocupada ou não está limpa
1: Mesa está ocupada ou está limpa
*/

module.exports = mongoose.model('Restaurante', restauranteSchema);