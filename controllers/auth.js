const local = require('passport-local').Strategy
const mongoose = require('mongoose')
//model de usuarios
require('../models/Users')
const modelUsuario = mongoose.model('users')



module.exports = function(passport){
    passport.use(new local({usernameField: 'email',passwordField: 'senha'},(email,senha,done)=>{
        modelUsuario.findOne({email:email}).then((usuario)=>{
            if(!usuario){
                return done (null,false,{message:"Esta conta não existe"})
            }else{
               
                return done(null,usuario)
            
            }

            //criptografia para comparar senhas
        })
        
    }))
    passport.serializeUser((usuario,done)=>{
        done(null,usuario.id)
    })
 
    passport.deserializeUser((id,done)=>{
        modelUsuario.findById(id,(err,usuario)=>{
            done(err,usuario)
        })
    })
 }