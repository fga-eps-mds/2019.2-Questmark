var app = require('./backend/config/server');

const port = process.env.PORT || 3000
app.listen(port,function(){
	console.log('Servidor ON');
});
