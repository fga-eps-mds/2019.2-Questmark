const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('../controllers/auth')(passport)



//Configurando a sessão 
app.use(session({
	secret: "questmarkmdseps2019.2",
	resave: true,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req,res,next)=>{
	res.locals.user = req.user || null; // armazena dados do usuario logado pega do passport//se caso não houver, é null
	res.locals.error= req.flash("error")
	res.locals.sucess = req.flash("sucess")
	next()
})
//Conexão do MongoDB
// const url = "mongodb://mongo/questmark";
const url = "mongodb://localhost/questmark";
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    	.then(() => {
        	console.log('Conectado com sucesso ao banco de dados.');
    	}).catch((err) => {
        	console.log("Houve um erro na conexão com o banco dados:" + err);
    	});

//Definindo EJS como motor de geração de views.
app.set('view engine','ejs');

app.set('views', path.join(__dirname + '../../../frontend/', 'views'));
console.log(__dirname)
//Configuração para utilizar arquivos estáticos nas views 
app.use(express.static(path.join(__dirname + "../../../frontend/public")));
//Incluindo body-parser como Middleware
app.use(bodyParser.urlencoded({extended:true}));

//Incluindo Json
app.use(express.json());


//----------Rotas----------
 //Página inicial
app.get("/",(req,res)=>{
	res.send('Página inicial');
 });

//Rotas secundarias (sub-rotas)
const forms = require('../routes/forms');
app.use('/forms',forms);
const users = require("../routes/users");
app.use('/users',users);


//var consign = require('consign');
//consign().include('application/routes').into(app); 

module.exports = app;

