const convertercsv = require('../backend/controllers/csv')

describe('Teste do  csv', () => {

it('Deve converter de json para csv',()=>{
    const respostas = [ { sexo: 'f', cpf: '123' } ]
    const csv = convertercsv(respostas);
    expect(csv).toBe(csv)
    expect(csv).toBeDefined()
    expect(csv).not.toBe(typeof(String))
    expect(csv).not.toBe(typeof(JSON))
    expect(csv).not.toEqual(respostas)
    
});


})
