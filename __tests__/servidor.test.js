//imorptando o superquest para trabalhar com http
const supertest = require('supertest')
//inserido a rota
const request = supertest('http://localhost:3000')
//o teste
test('Teste se o servidor está na porta 3000',()=>{
    //verifica se acessou
    return request.get('/').then(res =>expect(res.status).toBe(200))
})