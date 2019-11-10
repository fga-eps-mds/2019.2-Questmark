const app = require('../backend/config/server');
const request = require('supertest')

const formData = { nome: 'Lucas', data_quest: [{name_quest: 'Lucas'}], respostas: [ { nome: 'Lucas Lopes', idade: '20' } ], data: new Date()
};

const resp = {respostas: [ { nome: 'Lucas Lopes', idade: '20' } ]};


describe('Rota Formularios', () => {
    it('deve responder a rota incial', async () => {
      request(app).get('/')
      .expect(200)
      
    })

    it('deve responder a rota de registro', async () => {
      request(app).get('/forms/registro')
      .expect(200)

    })

    it('deve responder a rota de registro', async () => {
      request(app).post('/forms/registro/salvar')
      .send(formData)
      .end(function(err, res) {
        
        expect(res.body.nome).toBeDefined();
        done();
      
    }).expect(201)
  })

  it('deve responder a rota de {id} com sucesso', async () => {
    request(app).get('/forms/postar/123')
    .expect(200)
    request(app).get('/forms/editar/123')
    .expect(200)
    request(app).get('forms/listar_respostas/123')
    .expect(200)
    request(app).get('/converter_respostas/123')
    .expect(200)
    request(app).get('/dashboard/123')
    .expect(200)
    request(app).get('/delete/123')
    .expect(200)
  })

  it('deve reposnder  a rota de salvar reposta e salvar a repostas', async () => {
    request(app).post('/forms/salvar_resposta')
    .send(resp)
    .end(function(err, res) {
      expect(res.body.respostas).toBeDefined();
      done();
  }).expect(201)
})

it('Deve responder a rota de edição de formulario e salvar um formulario ',async ()=>{
  request(app).post('/forms/editar/123')
  .send(formData)
  .end(function(err, res) {
    expect(res.body.nome).toBeDefined();
    done();
}).expect(201)
})


})

