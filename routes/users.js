const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.send("Rota formulario cadastro usúario")
})


router.post('/novo',(req,res)=>{
    res.send("Rota salvar  cadastro usúario")
})

router.get('/delet',(req,res)=>{
    res.send("Rota deletar usúario")
})

module.exports = router