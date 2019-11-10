//importando o mongo
const mongoose = require('mongoose');
//importando o model
const modelFormulario = require('../backend/models/Formulario');
const modelUsers = require('../backend/models/Users');

//criando um dado do tpo formulario com todos os campos
const userdata = { nome: 'Lucas',email: 'l@gmail.com',senha:"lucas123"};
const formData = { nome: 'Lucas', data_quest: [{name_quest: 'Lucas'}], respostas: [ { nome: 'Lucas Lopes', idade: '20' } ], data: new Date()
};


//conectar com o mongo
describe('Conectar com o  mongo', () => {
    beforeAll(async () => {
        //conectando com o mongo pela jest config
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    afterAll(async () => {
            await connection.close();
            await db.close();
    });
});


//teste para criar e salvar um formulario

it('Deve criar e salvar um formulario generico', async () => {
    //criando um formulario
    const formulario = new modelFormulario(formData);
    //salvando
    const salvarformulario = await formulario.save();
    //verificando se o id está definido
    expect(salvarformulario._id).toBeDefined();
    //verificando se é igual
    expect(salvarformulario.nome).toBe(formData.nome);
     //verificando se é igual
    expect(salvarformulario.data_quest).toBe(formData.data_quest);
     //verificando se é igual
    expect(salvarformulario.data).toBe(formData.data);
     //verificando se é igual
    expect(salvarformulario.respostas).toBe(formData.respostas);
});

})