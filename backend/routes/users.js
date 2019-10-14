const express = require('express');
const router = express.Router();
require('../models/Users');
const mongoose = require('mongoose');
const modelUsers = mongoose.model("users");
const crypto = require('crypto');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

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
   });
});

router.get('/login',(req,res)=>{
    console.log('Erros: ');
    console.log(res.locals.error);
    res.render('usuarios/login');
});

router.post('/autenticar',
  [
      //Validação dos campos 
      check('email').not().isEmpty().withMessage('O campo email não deve ser vazio.'),
      check('senha').not().isEmpty().withMessage('O campo senha não deve ser vazio.')
  ],
  (req,res,next)=>{
    let dadosLogin = req.body;

    let erros = validationResult(req);
    console.log(erros);
    
    let usuarioAt = passport.authenticate("local",{
        successRedirect: '/forms',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next);

    console.log(usuarioAt);
});


module.exports = router;
