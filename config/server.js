var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Conexão do MongoDB
const url = "mongodb://localhost/questmark";
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    	.then(() => {
        	console.log('Conectado com sucesso ao banco de dados.');
    	}).catch((err) => {
        	console.log("Houve um erro na conexão com o banco dados:" + err);
    	});

//Definindo EJS como motor de geração de views.
app.set('view engine','ejs');
app.set('views','./application/views');

//Configuração para utilizar arquivos estáticos nas views 
app.use(express.static('./application/public'));

//Incluindo body-parser como Middleware
app.use(bodyParser.urlencoded({extended:true}));

//Incluindo Json
app.use(express.json());


//----------Rotas----------
 //Página inicial
app.get("/",(req,res)=>{
	res.render('./menu');
 });

//Rotas secundarias (sub-rotas)
const forms = require('../application/routes/forms');
app.use('/forms',forms);
const users = require("../application/routes/users");
app.use('/users',users);


//var consign = require('consign');
//consign().include('application/routes').into(app); 

module.exports = app;

