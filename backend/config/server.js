const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('../controllers/auth')(passport);


//Configurando a sessão 
app.use(session({
	secret: "questmarkmdseps2019.2",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
	res.locals.user = req.user || null; // armazena dados do usuario logado pega do passport//se caso não houver, é null
	res.locals.error = req.flash("error");
	res.locals.sucess = req.flash("sucess");
	next();
});

//Middleware para manipular/adicionar os cabeçalhos da requisição
app.use((req, res, next)=>{
	// Definindo hosts que podem fazer requisição no servidor
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Definindo quais métodos das requisições que serão permitidos 
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Definindo cabeçalhos que serão permitidos 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Configurar 'true' caso o website utilize cookies nas requisições => Sessões
    res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//Conexão do MongoDB
const url = "mongodb://localhost/questmark";
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Conectado com sucesso ao banco de dados.');
	}).catch((err) => {
		console.log("Houve um erro na conexão com o banco dados:" + err);
	});

//Definindo EJS como motor de geração de views.
app.set('view engine', 'ejs');
mongoose.set('useFindAndModify', false);
app.set('views', path.join(__dirname + '../../../frontend/', 'views'));
console.log(__dirname)
//Configuração para utilizar arquivos estáticos nas views 
app.use(express.static(path.join(__dirname + "../../../frontend/public")));
//Incluindo body-parser como Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Incluindo Json
app.use(express.json());


//----------Rotas----------
//Página inicial
app.get("/", (req, res) => {
	res.render('./home/home');
});

app.get("/ajuda",(req,res)=>{
	res.render('./ajuda/ajuda')
});
//Rotas secundarias (sub-rotas)
const forms = require('../routes/forms');
app.use('/forms', forms);
const users = require("../routes/users");
app.use('/users', users);
const forgot_password = require('../routes/forgot_password');
app.use('/password', forgot_password);
const parseMarkdownToHMTL = require('../routes/parser');
app.use('/parse', parseMarkdownToHMTL);

//var consign = require('consign');
//consign().include('application/routes').into(app); 

module.exports = app;