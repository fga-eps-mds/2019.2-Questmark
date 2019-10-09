const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const crypto = require('crypto')

require('../models/Formulario')
const modelFormulario = mongoose.model("formulario")
require('../models/Users')
const modelUsers = mongoose.model("users")

router.get('/cadastro',(req,res)=>{
    res.render('./usuarios/criar_conta');
})

router.post('/criar_conta',(req,res)=>{
    //Criptogragia MD5 da senha => Criptografia unidirecional
    const senhaCrypto = crypto.createHash('md5').update(req.body.senha).digest('hex');
    let usuario = {
        nome : req.body.nome,
        email: req.body.email,
        senha: senhaCrypto
    }  
    console.log(usuario)
    new modelUsers(usuario).save().then(()=>{
        console.log("Usuário registrado com sucesso.")
        res.redirect('/forms')
    }).catch((err)=>{
        console.log(err)
        res.redirect('/')
    })
})

module.exports = router;