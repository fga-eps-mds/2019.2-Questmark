const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Users')
const modelUsers = mongoose.model("users")
const passport = require('passport')
const crypto = require('crypto')


router.get('/',(req,res)=>{
    res.render('../../frontend/views/usuarios/criar_conta')
});
router.post('/criarconta',(req,res)=>{
   modelUsers.findOne({email:req.body.email}).then((usuario)=>{
       if(usuario){
           console.log("usuario já existe")
           res.redirect('/users')
       }
       else{
            const senhaCrypto = crypto.createHash('md5').update(req.body.senha).digest('hex');
            const novousuario = new modelUsers({
                nome: req.body.nome,
                email: req.body.email,
                senha:senhaCrypto
            })
            novousuario.save().then(()=>{
                console.log("Salvou")
            }).catch((erro)=>{
                console.log(erro)
            })
       }
   })


});
router.get('/login',(req,res)=>{
   res.render('../../frontend/views/usuarios/login');
});

router.post('/login',(req,res,next)=>{
    passport.authenticate("local",{
        successRedirect: '/forms',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next)
});

router.get('/logout', function(req, res){
    console.log("Deslogado");
    req.logout();
    res.redirect('/users/login');
});

  module.exports = router
