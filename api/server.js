const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRouter = require('./routes/users');
const formsRouter = require('./routes/forms');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Conecta com o banco de dados
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true});

//Verifica se a conexão foi estabelecida
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("Conexão estabelecida com o MongoDB");
});

app.use('/users',usersRouter);
app.use('/forms',formsRouter);

app.listen(port, () => {
    console.log(`Server ON - Port : ${port}`);
})