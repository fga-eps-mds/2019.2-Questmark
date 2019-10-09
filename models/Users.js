const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    senha:{
        type: String,
        required: true
    },
    admin:{
        type: Number,
        required: true,
        default: 0
    },
    formulario:[{
        type: Schema.Types.ObjectId,
        ref:"formulario",
        required: false	
    }]
})

module.exports = mongoose.model('users', Usuario);