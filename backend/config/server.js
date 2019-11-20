const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('../controllers/auth')(passport);

const forms = require('../routes/forms');
const users = require('../routes/users');
const forgot_password = require('../routes/forgot_password');
const parseMarkdownToHMTL = require('../routes/parser');

const url = "mongodb+srv://questmarkdeploy:questmarkdeploy@cluster0-62j7g.mongodb.net/test?retryWrites=true&w=majority";

app.use(session({
	secret: "questmarkmdseps2019.2",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	res.locals.error = req.flash("error");
	res.locals.sucess = req.flash("sucess");
	next();
});
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
mongoose.set('useFindAndModify', false);
app.set('views', path.join(__dirname + '../../../frontend/', 'views'));
app.use(express.static(path.join(__dirname + "../../../frontend/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.render('./home/home');
});
app.get("/ajuda", (req, res) => {
	res.render('./ajuda/ajuda');
});

app.use('/forms', forms);
app.use('/users', users);
app.use('/password', forgot_password);
app.use('/parse', parseMarkdownToHMTL);

module.exports = app;