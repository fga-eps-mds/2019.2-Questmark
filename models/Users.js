const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        minlength : 3
    },
    email : {
        type : String,
        required : true,
        unique : true
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
    formulario:{
        type: Schema.Types.ObjectId,
        ref:"formulario",
        required: false	
    }
},{
    timestamps : true,        
});

const User = mongoose.model('User', userSchema);

module.exports = User;


