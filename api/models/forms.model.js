const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    username : { 
        type : String,
        required : true
    },
    formname : {
        type : String,    
        required : true
    },
    content : { 
        type : String,
        required : true
    },
    date : { 
        type : Date,
        default : Date.now()
    }
})

const Form = mongoose.model('Form', formSchema);

module.exports = Form;