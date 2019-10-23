//importando o mongo
const mongoose = require('mongoose');
//importando o model
const modelFormulario = require('../backend/models/Formulario');
//criando um dado do tpo formulario com todos os campos
const formData = { nome: 'Lucas', data_quest: [{name_quest: 'Lucas'}], respostas: [ { nome: 'Lucas Lopes', idade: '20' } ], data: new Date()
};


const modelUsers = require('../backend/models/Users');
//criando um dado do tpo formulario com todos os campos
const user = { nome: 'Lucas', email:'lopes@gmail.com' , senha: "1234567789"};



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

//teste para inserir formulario com campo inexistente e verificar se esse campo é indefinidado
it('Não deve inserir formulario  com um campo  inexistente.', async () => {
    //criando um formulario
    const formulariocampoinvalido = new modelFormulario({ nome: 'Lucas', data_quest: [{name_quest: 'Lucas'}], data: new Date(),resp:'a'});
    //salvando o formulario
    const salvarformulariocampoinvalido = await formulariocampoinvalido.save();
    //verificando se é definido (existe)
    expect(salvarformulariocampoinvalido._id).toBeDefined();
    //verificar se o campo .resp é indefinido 
    expect(salvarformulariocampoinvalido.resp).toBeUndefined();
});
    //'criando um formulario sem um campo obrigatorio e verificado a falha'
it('Não deve criar sem um campo obrigatorio ', async () => {
    //criando formulario so com o nome
    const formularioSemObrigatorio = new modelFormulario({ nome: 'Lucas' });
    let err;
    try {
        //tenta salvar
        const salvarFormularioSemObrigatorio = await formularioSemObrigatorio.save();
        error = salvarFormularioSemObrigatorio;
    } catch (error) {
        //salva o erro
        err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    //verifica que esse campo tinha que ser definido
    expect(err.errors.data_quest).toBeDefined();
});


it('Deve criar e salvar um usuario generico', async () => {
    //criando um user
    const usuario = new modelUsers(user);
    //salvando
    const salvarusuario = await usuario.save();
    //verificando se o id está definido
    expect(salvarusuario._id).toBeDefined();
    //verificando se é igual
    expect(salvarusuario.nome).toBe(usuario.nome);
     //verificando se é igual
    expect(salvarusuario.email).toBe(usuario.email);
     //verificando se é igual
    expect(salvarusuario.senha).toBe(usuario.senha);
});

it('Não deve inserir um usuario sem a senha', async () => {
    //criando um formulario
    const usuarioinvalido = new modelUsers({ nome: 'Lucas',email:'lucas@gmail.com'});
    //salvando o formulario
    const salvarinvalido = await usuarioinvalido.save();
    //verificando se é definido (existe)
    expect(salvarinvalido._id).toBeDefined();
    //verificar se o campo .resp é indefinido 
    expect(salvarinvalido.senha).toBeUndefined();
});

it('Não deve inserir um usuario sem o email', async () => {
    //criando um formulario
    const usuarioinvalido = new modelUsers({ nome: 'Lucas',senha:'1234567'});
    //salvando o formulario
    const salvarinvalido = await usuarioinvalido.save();
    //verificando se é definido (existe)
    expect(salvarinvalido._id).toBeDefined();
    //verificar se o campo .resp é indefinido 
    expect(salvarinvalido.senha).toBeUndefined();
});

it('Não deve criar sem um campo obrigatorio ', async () => {
    //criando formulario so com o nome
    const usuariosemobrigatorio = new modelUsers({ nome: 'Lucas' });
    let err;
    try {
        //tenta salvar
        const salvarusersemobrigatorio = await usuariosemobrigatorio.save();
        error = salvarusersemobrigatorio;
    } catch (error) {
        //salva o erro
        err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    //verifica que esse campo tinha que ser definido
    expect(err.errors.email).toBeDefined();
});


})