//imports
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const users = require('./routes/users')
const forms = require('./routes/forms')


//configurações 
    //mongoose
    mongoose.connect("mongodb://mongo/questmark").then(()=>{
        console.log('conectado com sucesso')
    }).catch((err)=>{
    console.log("houve um erro"+err)
    })


//rotas
    //rotas principais 
        app.get('/',(req,res)=>{
            res.send("Hello World")
        })
    //rotas secundarias 
        //rotas usuarios (users)
        app.use('/users',users)
        //rota formularios(forms)
        app.use('/forms',forms)

//servidor

app.listen(3000, () => console.log('SV ativo na porta 3000'));