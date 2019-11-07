const app = require("../backend/config/server"); // Link to your server file
const request = require("supertest");
const user = {nome:'Lucas', email: "L@gmail.com", senha: "1234456"}


describe('Rotas usuarios', () => {
    it('deve responder a rota de cadastro', async (done) => {
        request(app).get('/users/cadastro')
        .expect(200)
        .expect(/criar_conta/)
        done ();
    })

    it('deve criar um usuario', async () => {
        request(app).post('/users/criar_conta')
        .send(user)
        .end(function(err, res) {
          expect(res.body.nome).toBe(user.nome);
          expect(res.body.email).toBe(user.email)
          expect(res.body.email).toBe(user.senha)
          done();
        
      })
    })

    it('deve responder a rota de login ', async (done) => {
        request(app).get('/users/login')
        .expect(200)
        .expect(/login/)
        done ();
    })

    // it('deve logar no sitema com sucesso ', async (done) => {
        
    // })

    it('deve deslogar do sistema com sucesso', async (done) => {
        request(app).get('/users/logout')
        .expect(200)
        done ();
        
    })

})


