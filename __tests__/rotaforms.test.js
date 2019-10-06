const app = require('../config/server');
const request = require('supertest')

const formData = { nome: 'Lucas', data_quest: [{name_quest: 'Lucas'}], respostas: [ { nome: 'Lucas Lopes', idade: '20' } ], data: new Date()
};


describe('Rotas', () => {
    it('deve responder a rota incial', async () => {
      request(app).get('/forms/')
      .expect(200)
      .expect(/formulario/)
    })

    it('deve responder a rota de registro', async () => {
      request(app).get('/forms/registro')
      .expect(200)

    })

    it('deve responder a rota de registro', async () => {
      request(app).post('/forms/registro/salvar')
      .send(formData)
      .end(function(err, res) {
        expect(res.body.nome).to.be.equal('Lucas');
        expect(res.statusCode).to.be.equal(200);
        done();
      
    })
  })



})

