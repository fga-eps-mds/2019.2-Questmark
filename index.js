//imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const forms = require('./routes/forms');

//configurações 
//mongoose
const url = "mongodb://mongo/questmark";
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado com sucesso ao banco de dados.');
    }).catch((err) => {
        console.log("houve um erro" + err);
    });

//rotas
//rotas principais 
app.get('/', (req, res) => {
    res.send("Hello World");
});
//rotas secundarias 
//rotas usuarios (users)
app.use('/users', users);
//rota formularios(forms)
app.use('/forms', forms);

//servidor

app.listen(3000, () => console.log('Server ativo na porta 3000.'));