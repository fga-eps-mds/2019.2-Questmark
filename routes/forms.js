const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send("Rota de cadastro formulario")
})


router.post('/novo',(req,res)=>{
    res.send("Rota salvar  cadastro formulario")
})

router.get('/delet',(req,res)=>{
    res.send("Rota deletar formulario")
})

router.get('/edit/:id',(req,res)=>{
    res.send("rota para editar fomulario")
})

router.post('/edit',(req,rs)=>{
    res.send("salvar alterações ")
})
module.exports = router