const express = require('express');
const app = express();

//importando rota usuers
const users = require('./routes/users')



//rotas
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/users',users)

//servidor

app.listen(3000, () => console.log('SV ativo na porta 3000'));