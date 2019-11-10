var request = require('supertest');
var server = request.agent('http://localhost:3000');

describe('O Usuario génerio deve-se autenticar no sistema', function(){
    it('login', loginUser());
    it('Requer que o usuario faça login', function(done){
    server
        .get('')                       
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
          
            done()
        });
    });
});

