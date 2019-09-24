const express = require('express');
const app = express();

//importando rota usuers
const users = require('./routes/users')
const forms = require('./routes/forms')

//rota principal
app.get('/',(req,res)=>{
    res.send("Hello World")
})
//rotas usuarios (users)
app.use('/users',users)

//rota formularios(forms)

app.use('/forms',forms)

//servidor

app.listen(3000, () => console.log('SV ativo na porta 3000'));