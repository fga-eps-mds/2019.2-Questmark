const express = require('express');
const router = express.Router();
require('../models/Users');
const mongoose = require('mongoose');
const modelUsers = mongoose.model("users");
const crypto = require('crypto');
const passport = require('passport');

router.get('/cadastro', (req, res) => {
  res.render('./usuarios/criar_conta');
});

router.post('/criar_conta', (req, res) => {
  const senhaCrypto = crypto.createHash('md5').update(req.body.senha).digest('hex');
  const novousuario = new modelUsers({
    nome: req.body.nome,
    email: req.body.email,
    senha: senhaCrypto
  });
  novousuario.save().then(() => {
    res.send({ check: true, msg: 'Cadastro concluído com sucesso!' });
  }).catch((erro) => {
    res.send({ check: false, msg: 'Erro ao cadastrar usuário.' });
  });
});

router.post('/validar_email', (req, res) => {
  modelUsers.findOne({ email: req.body.email }).then((usuario) => {
    if (usuario) {
      res.send({ checkEmail: false });
    }
    else {
      res.send({ checkEmail: true });
    }
  });
});

router.post('/validar_senha', (req, res) => {
  const minLength = 6;
  const regex = /([a-zA-Z]*([0-9]+[a-zA-Z]+)|([a-zA-Z]+[0-9]+)[0-9]*)/;
  if (regex.test(req.body.senha) && req.body.senha.length >= minLength) {
    res.send({ checkPassword: true });
  }
  else {
    res.send({ checkPassword: false });
  }

});

router.get('/login', (req, res) => {
  if (res.locals.error.length > 0) {
    let [erro, userEmail] = res.locals.error[0].split('Email:');
    res.render('usuarios/login', { validacao: [{ msg: erro }], email: userEmail });
  }
  else {
    res.render('usuarios/login', { validacao: {}, email: [] });
  }
});

router.post('/autenticar', (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: '/forms',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;