const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Formulario = new Schema({
    nome: {
        type: String,
        required: true
    },
    data_quest: {
        type: Object,
        required: true
    },
    respostas: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('formulario', Formulario);

