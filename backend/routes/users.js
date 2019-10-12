const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Users')
const modelUsers = mongoose.model("users")
const passport = require('passport')
const crypto = require('crypto')

router.get('/cadastro',(req,res)=>{
    res.render('./usuarios/criar_conta')
})

router.post('/criar_conta',(req,res)=>{
   modelUsers.findOne({email:req.body.email}).then((usuario)=>{
       if(usuario){
           console.log("usuario já existe");
           res.redirect('/users/cadastro');
       }
       else{
            const senhaCrypto = crypto.createHash('md5').update(req.body.senha).digest('hex');
            const novousuario = new modelUsers({
                nome: req.body.nome,
                email: req.body.email,
                senha:senhaCrypto
            })
            novousuario.save().then(()=>{
                console.log("Usuário cadastrado.")
                res.redirect('/users/login')
            }).catch((erro)=>{
                console.log("Erro ao cadastrar usuário.")
                console.log(erro)
                res.redirect('/users/cadastro')
            })
       }
   })
})

router.get('/login',(req,res)=>{
    console.log('Erros: ');
    console.log(res.locals.error);
    res.render('usuarios/login');
});

router.post('/autenticar',(req,res,next)=>{
    let usuarioAt = passport.authenticate("local",{
        successRedirect: '/forms',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);

    console.log(usuarioAt);
});


module.exports = router;
