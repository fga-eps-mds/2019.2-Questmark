const express = require('express')
const router = express.Router()

require('../models/Users')
require('../models/Formulario')
const mongoose = require('mongoose')
const modelUsers = mongoose.model("users")
const modelFormulario = mongoose.model("formulario")
const { check, validationResult } = require('express-validator');

//Rota de listagem de formulários
router.get('/',(req,res)=>{
    if(req.user){
        modelUsers.findById(req.user).populate('formulario').then((user)=>{
            res.render('./formularios/inicio',{formulario:user.formulario});
        });
    }
    else{
        res.redirect('/users/login');
    }
});

//Rota de cadastro de um novo formulario
router.get('/registro',(req,res)=>{
    if(req.user){
        res.render('./formularios/cadastro_formulario');
    }
    else{
        res.redirect('/users/login');
    }
});

//Rota para salvar novo formulário
router.post('/registro/salvar',
    [//Validação dos campos
        check('name_quest').not().isEmpty().withMessage('Campo nome está vazio.'),
        check('copy_markdown').not().isEmpty().withMessage('Campo markdown está vazio.'),
    ],(req,res)=>{
        let erros = validationResult(req);
        let dadosForm = req.body;
        
        if(erros.array().length > 0){
            console.log(erros.array());
            res.send({validacao: erros.array(), status: false});
        }       
        else{
            var formulario = {
                nome : dadosForm.name_quest,
                data_quest: dadosForm
            };  
            new modelFormulario(formulario).save().then((formulario)=>{
                let tmpfm = req.user.formulario
                tmpfm.push(formulario)
                modelUsers.updateOne({_id: req.user.id},{$set: {'formulario' : tmpfm }},(err,result) => {
                    console.log(result);
                    res.send({validacao: [{msg:'Questionário cadastrado!'}],status: true});
                    console.log("Salvo com sucesso.");
                })
            }).catch((err)=>{
                console.log(err)
                res.send({validacao: [{msg:'Falha ao salvar o questionário.'}],status: false});
            });
        }
    }
);

//Rota de visualizar um questionario e responder
router.get('/postar/:id',(req,res)=>{
    modelFormulario.findOne({_id:req.params.id}).then((formulario)=>{
        res.render("./formularios/visualizar_formulario",{name_quest: formulario.nome,
                                                          copy_html: formulario.data_quest.copy_html, 
                                                          id: formulario._id});
    });
});

//Rota para Editar Formulário
router.get('/editar_formulario/:id', (req,res)=>{
    modelFormulario.findOne({_id:req.params.id}).then((formulario)=> {
        res.render("./formularios/editar_formulario",{
            name_quest: formulario.nome,
            copy_markdown: formulario.data_quest.copy_markdown,
            id: formulario.id});
    });
});

router.post('/salvar_edicao/:id',
    [//Validação dos campos
        check('name_quest').not().isEmpty().withMessage('Campo nome está vazio.'),
        check('copy_markdown').not().isEmpty().withMessage('Campo markdown está vazio.'),
    ],(req,res)=>{
        let erros = validationResult(req);
        const id = req.params.id;
        let dadosForm = req.body;
        
        if(erros.array().length > 0){
            console.log(erros.array());
            res.send({validacao: erros.array(), status: false});
        } 
        else{
            modelFormulario.updateOne({_id: id},{$set: {'nome' : dadosForm.name_quest, "data_quest": dadosForm}},(err,result) => {
                if(err){
                    console.log('Erro ao salvar a resposta: ' + err);
                    res.send({validacao: [{msg:'Falha no servidor ao tentar salvar as modificações.'}],status: false});     
                }                    
                else{
                    res.send({validacao: [{msg:'Modificações Salvas com Sucesso!'}],status: true});     
                }
            });
        }
    }
);

//Rota de salvar a resposta do questionário
router.post('/salvar_resposta/:id',(req,res)=>{
    let resposta = req.body;
    let tmpAnswers = [];
    const id  = req.params.id
    console.log(resposta)

    modelFormulario.findOne({_id: id},(err,formulario) => {
        if(err){
            console.log(`Falha ao tentar recuperar respostas anteriores de ${id}.Erro: ` + err);
        }
        else{               
            if(formulario.respostas != undefined) tmpAnswers = formulario.respostas;
            tmpAnswers.push(resposta);
            modelFormulario.updateOne({_id: id},{$set: {'respostas' : tmpAnswers }},(err,result) => {
                if(err)
                    console.log('Erro ao salvar a resposta: ' + err);
                else
                    console.log('Resposta salva ! Resposta: ' + result);
                res.redirect('/forms')      
            });
            console.log(tmpAnswers)
        }
    });
   
});

//Rota de listagem de resposta de um formulário
router.get('/listar_respostas/:id',(req,res)=>{
    if(req.user){
        modelFormulario.findOne({_id:req.params.id}).then((formulario)=>{
            res.render("./formularios/lista_respostas",{formulario:formulario})
        })
    }
    else{
        res.redirect('/users/login');
    }
});

//Rota de remoção de um formulário
router.get('/delete/:id',(req,res)=>{
    if(req.user){
        const id = req.params.id;
        modelFormulario.findOneAndDelete(id).then(()=>{
            console.log('deletado')
            res.redirect('/forms')
        }).catch((err)=>{
            console.log(err)
            res.redirect('/forms')
        });
    }
    else{
        res.redirect('/users/login');
    }
});

module.exports = router;
