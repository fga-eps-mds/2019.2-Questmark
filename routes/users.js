
const express = require('express')
const router = express.Router()
require('../models/Formulario')
const mongoose = require('mongoose')
const modelFormulario = mongoose.model("formulario")

require('../models/Users')
const modelUsers = mongoose.model("users")
router.get('/',(req,res)=>{
    res.render('./usuarios/criarconta')
})

router.post('/criarconta',(req,res)=>{
    var usuario = {
        nome : req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }  
    console.log(usuario)
    new modelUsers(usuario).save().then(()=>{
        console.log("salvo com sucesso")
        res.redirect('/forms')
    }).catch((err)=>{
        console.log(err)
        res.redirect('/')
    })
})


module.exports = router