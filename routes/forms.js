
const express = require('express');
const router = express.Router();

require('../models/Users');
require('../models/Formulario');
const mongoose = require('mongoose');
const modelUsers = mongoose.model("users");
const modelFormulario = mongoose.model("formulario");

//Rota da view de registro de formulário
router.get('/registro',(req,res)=>{
    res.render('./formularios/cadastro_formulario');
});

//Rota para salvar formulário
router.post('/registro/salvar',(req,res)=>{
    let dados = req.body;
    console.log(dados);
    var formulario = {nome: dados.name_quest,data_quest: dados};
    new modelFormulario(formulario).save()
        .then(()=>{
            console.log("Formulário salvo com sucesso!");
        })
        .catch((err)=>{
            console.log(err);
        })
});

//Rota de listagem de formulários
router.get('/listagem',(req,res)=>{
    modelFormulario.find().then((formulario)=>{
        res.render("./formularios/inicio",{formulario:formulario})
    })
})

//Rota para visualizar um formulários e responder
router.get('/visualizar/:id',(req,res)=>{
    modelFormulario.findOne({_id:req.params.id}).then((formulario)=>{
        res.render("./formularios/visualizar_formulario",{name_quest: formulario.nome,
                                                          copy_html: formulario.data_quest.copy_html});
    });
});

//Rota para apagar formulario
router.get('/deletar/:id',(req,res)=>{
    //var id = req.body.id;
    let id = req.params.id;
    modelFormulario.findOneAndDelete(id).then(()=>{
        console.log('Formulário deletado.');
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect('/forms/listagem');
})

module.exports = router;