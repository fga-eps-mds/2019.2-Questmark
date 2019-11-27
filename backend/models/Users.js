const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        minlength: 6
    },
    admin: {
        type: Number,
        required: true,
        default: 0
    },
    formulario: [{
        type: Schema.Types.ObjectId,
        ref: "formulario",
        required: false
    }],
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false
    }
});

module.exports = mongoose.model('users', Usuario);