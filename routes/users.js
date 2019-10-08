const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/Users')
const modelUsers = mongoose.model("users")


const passport = require('passport')



router.get('/',(req,res)=>{
    res.render('./usuarios/criarconta')
})

router.post('/criarconta',(req,res)=>{

   modelUsers.findOne({email:req.body.email}).then((usuario)=>{
       if(usuario){
           console.log("usuario já existe")
           res.redirect('/users')
       }
       else{
            const novousuario = new modelUsers({
                nome: req.body.nome,
                email: req.body.email,
                senha:req.body.senha,
            })
            novousuario.save().then(()=>{
                console.log("Salvou")
            }).catch((erro)=>{
                console.log(erro)
            })

           //hash de criptografa 
       }
   })


})

router.get('/login',(req,res)=>{
    res.render('./usuarios/login')
})

router.post('/login',(req,res,next)=>{
    passport.authenticate("local",{
        successRedirect: '/forms',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next)
})

module.exports = router