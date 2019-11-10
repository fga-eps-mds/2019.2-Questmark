const app = require("../backend/config/server"); // Link to your server file
const request = require("supertest");
const user = {nome:'Lucas', email: "L@gmail.com", senha: "1234456"}


describe('Rotas usuarios', () => {
    it('deve responder a rota de cadastro', async (done) => {
        request(app).get('/users/cadastro')
        .expect(200)
        done ();
    })

    it('deve criar um usuario', async () => {
        request(app).post('/users/criar_conta')
        .send(user)
        .end(function(err, res) {
          expect(res.body.nome).toBeDefined(user.nome);
          expect(res.body.email).toBeDefined(user.email)
          expect(res.body.senha).toBeDefined(user.senha)
          done();
      }).expect(201)
    })

    it('deve responder a rota de login ', async() => {
        request(app).get('/users/login')
        .expect(200)
        
    })

    it('deve responder a rota de email',async ()=>{
        request(app).post('/validar_email')
        .expect(200)
        .send('a@gmail.com')
        .expect(201)
       
    })
   
    

})


