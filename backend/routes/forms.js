const express = require('express')
const router = express.Router()

require('../models/Users')
require('../models/Formulario')
const mongoose = require('mongoose')
const modelUsers = mongoose.model("users")
const modelFormulario = mongoose.model("formulario")

//rota das opções
router.get('/',(req,res)=>{
    modelUsers.findById(req.user).populate('formulario').then((user)=>{
        // console.log('usuario',req.user)
        // console.log('formulario',req.user.formulario)
       // console.log('aaa',user.formulario.length)
        res.render('./formularios/inicio',{formulario:user.formulario})
    
    })
})

//rota que mostra o  layout de  cadastro de um novo formulario
router.get('/registro',(req,res)=>{
    res.render("./formularios/cadastro_formulario");
})

router.post('/registro/salvar',(req,res)=>{
    let dados = req.body;
    var erros = [];

    //Validação dos campos
    if(dados.name_quest == ''){
        erros.push({erro: "Campo nome está vazio."})
    }
    if(dados.copy_markdown == ''){
        erros.push({erro: "Campo markdown está vazio."})
    }

    if(erros.length > 0){
        console.log(erros);
        res.send({msg: erros, status: false});
    }
    else{
        var formulario = {
            nome : dados.name_quest,
            data_quest: dados
        };  
        new modelFormulario(formulario).save().then((formulario)=>{
            let tmpfm = req.user.formulario
            tmpfm.push(formulario)
            modelUsers.updateOne({_id: req.user.id},{$set: {'formulario' : tmpfm }},(err,result) => {
                console.log(result)
                res.send({msg: 'Questionário cadastrado!',status: true});
                console.log("Salvo com sucesso.");
            })
            
         
        }).catch((err)=>{
            console.log(err)
            res.send({msg:['Falha ao salvar o questionário.'],status: false});
        });
    }
});

//visualizar um questionario e responder
router.get('/postar/:id',(req,res)=>{
    modelFormulario.findOne({_id:req.params.id}).then((formulario)=>{
        res.render("./formularios/visualizar_formulario",{name_quest: formulario.nome,
                                                          copy_html: formulario.data_quest.copy_html, 
                                                          id: formulario._id});
    });
    
});

//salvar a resposta do questionar
router.post('/salvar_resposta/:id',(req,res)=>{
    let resposta = req.body;
    let tmpAnswers = [];
    var id  = req.params.id
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
   
})

router.get('/listar_respostas/:id',(req,res)=>{
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

module.exports = router;
