const local = require('passport-local').Strategy
const mongoose = require('mongoose')
//model de usuarios
require('../models/Users')
const modelUsuario = mongoose.model('users')



module.exports = function(passport){
    //criando uma sessão 
    passport.use(new local({usernameField: 'email',passwordField: 'senha'},(email,senha,done)=>{
        modelUsuario.findOne({email:email}).then((usuario)=>{
            if(!usuario){
                return done (null,false,{message:"Esta conta não existe"})
            }else{
               
                return done(null,usuario)
            
            }

            //{}criptografia para comparar senhas
        })
        
    }))
    //salva os dados do usuario em uma sessão
    passport.serializeUser((usuario,done)=>{
        done(null,usuario.id)
    })
    //procura um usuario pelo id dele
    passport.deserializeUser((id,done)=>{
        modelUsuario.findById(id,(err,usuario)=>{
            done(err,usuario)
        })
    })
 }