const app = require('../config/server');
const request = require('supertest')

describe('Rotas', () => {
    it('deve responder a rota incial', async () => {
      request(app).get('/forms/')
      .expect(200)
      .expect(/formulario/)
    })

})

