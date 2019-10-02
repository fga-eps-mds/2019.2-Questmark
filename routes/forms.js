
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Users')
const modelUsers = mongoose.model("users")

require('../models/Formulario')
const modelFormulario = mongoose.model("formulario")

//rota das opções
router.get('/',(req,res)=>{
    modelFormulario.find().then((formulario)=>{
        res.render('./formularios/inicio',{formulario:formulario})
    })
   
})
//rota que mostra o  layout de  cadastro de um novo formulario
router.get('/registro',(req,res)=>{
    res.render('./formularios/cadastro_formulario')
    
})

router.post('/registro/salvar',(req,res)=>{
    let dados = req.body
    var erros = []
    if(dados.name_quest =='' ){
        erros.push({texto:"Nome vazio"})
    }
    if(dados.copy_markdown ==''){
        erros.push({texto:"Entrada em markdown Vazio"})
    }
    console.log(erros.length)
    if(erros.length>0){
        console.log(erros)
        req.flash("error","Há campos Vazios")
        res.render('./formularios/novoformulario')
    }else{
        var formulario = {
            nome : dados.name_quest,
            data_quest: dados
        }  
        new modelFormulario(formulario).save().then(()=>{
            console.log("salvo com sucesso")
            res.redirect('/')
        }).catch((err)=>{
            console.log(err)
            res.redirect('/')
        
        })
    }
})


//visualizar um questionario e responder

router.get('/postar/:id',(req,res)=>{
    modelFormulario.findOne({_id:req.params.id}).then((formulario)=>{
        res.render("./formularios/visuformulario",{formulario:formulario})
    })
    
});

//salvar a resposta do questionar

router.post('/salvarresposta/:id',(req,res)=>{
    let resposta = req.body;
    let tmpAnswers = [];
    var id  = req.params.id
    console.log("AAAAA")
    console.log(resposta)

    modelFormulario.findOne({_id: id},(err,formulario) => {
        if(err){
            console.log(`Falha ao tentar recuperar respostas anteriores de ${id}.Erro: ` + err);
        }
        else{				
            if(formulario.respostas != undefined) 
            tmpAnswers = formulario.respostas;
            tmpAnswers.push(resposta);
            modelFormulario.updateOne({_id: id},{$set: {'respostas' : tmpAnswers }},(err,result) => {
                if(err)

                    console.log('Erro ao salvar a resposta: ' + err);
                    
                else
                    console.log('Resposta salva ! Resposta: ' + result);
                    res.redirect('/forms')		
            });
            console.log(tmpAnswers)
            console.log("eeeaiadoa")
            console.log(formulario.respostas)
        }
    });
   
})

router.get('/listarespostas/:id',(req,res)=>{
    modelFormulario.findOne({_id:req.params.id}).then((formulario)=>{
        res.render("./formularios/lista_respostas",{formulario:formulario})
    })
})


router.get('/delete/:id',(req,res)=>{
    var id = req.params.id
    modelFormulario.findOneAndDelete(id).then(()=>{
        console.log('deletado')
        res.redirect('/forms')
    }).catch((err)=>{
        console.log(err)
        res.redirect('/forms')
    })
})




module.exports = router