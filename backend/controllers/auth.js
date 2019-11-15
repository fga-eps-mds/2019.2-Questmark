const local = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('../models/Users');
const modelUsuario = mongoose.model('users');
const crypto = require('crypto');

module.exports = function (passport) {
    passport.use(new local({ usernameField: 'email', passwordField: 'senha' }, (email, senha, done) => {
        modelUsuario.findOne({ email: email }).then((usuario) => {
            if (!usuario) {
                return done(null, false, { message: `Usuário não existe.Email:${email}` });
            } else {
                const senhaCrypto = crypto.createHash('md5').update(senha).digest('hex');
                if (usuario.senha === senhaCrypto) {
                    return done(null, usuario);
                }
                else {
                    return done(null, false, { message: `A senha inserida está incorreta.Email:${email}` });
                };
            };
        });
    }));
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    });
    passport.deserializeUser((id, done) => {
        modelUsuario.findById(id, (err, usuario) => {
            done(err, usuario)
        });
    });
};