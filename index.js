const express = require('express');
const ejs = require('ejs');
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

//EJS
app.set('view engine','ejs');
// configuração do path
//app.use(express.static(path.join(__dirname,"public")))

//servidor

app.listen(3000, () => console.log('SV ativo na porta 3000'));