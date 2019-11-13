const convertercsv = require('../../backend/controllers/csv');
const respostas = [ { sexo: 'f', cpf: '123' } ];


describe('Teste do  csv', () => {

it('Deve ser em json antes da conversão',()=>{
    expect(respostas).toEqual([{ sexo: 'f', cpf: '123' }]);
    expect(respostas).toBeDefined();
    expect(respostas).not.toBe(typeof(String));
        
});
    

it('Deve converter de json para csv',()=>{
    const csv = convertercsv(respostas);
    expect(csv).toBe(csv);
    expect(csv).toBeDefined();
    expect(csv).not.toBe(typeof(String));
    expect(csv).not.toBe(typeof(JSON));
    expect(csv).not.toEqual(respostas);
    
});
})
