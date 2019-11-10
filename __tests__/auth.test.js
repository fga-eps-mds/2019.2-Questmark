var request = require('supertest');
var server = request.agent('http://localhost:3000');

describe('O Usuario génerio deve-se autenticar no sistema', function(){
    it('login', loginUser());
    it('Requer que o usuario faça login', function(done){
    server
        .get('/users/login')                       
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
            done()
        });
    });
});

function loginUser() {
    return function(done) {
        server
            .post('/users/autenticar')
            .send({ nome: 'admin', senha: 'admin', email:"admin@gmail.com" })
            .expect(302)
            .expect('Location', '/users/login')
            .end(onResponse);

        function onResponse(err, res) {
           if (err) return done(err);
           return done();
        }
    };
};