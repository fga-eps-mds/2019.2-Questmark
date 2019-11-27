//importando o mongo
const mongoose = require('mongoose');
//importando o model
const modelFormulario = require('../../backend/models/Formulario');
const modelUsers = require('../../backend/models/Users');

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

it('Deve Encontrar o formulario cadastrado',async()=>{
    const system = await modelFormulario.findOne({ nome: 'Lucas' });
    expect(system.nome).toEqual(formData.nome);
    expect(system.nome).toBeDefined();
})

it('Deve criar um usuario génerico',async()=>{
    //criando um usuário
    const usuario = new modelUsers(userdata);
    const salvarusuario = await usuario.save();
    expect(salvarusuario._id).toBeDefined();
    expect(salvarusuario.nome).toBe(userdata.nome);
    expect(salvarusuario.email).toBe(userdata.email);
    expect(salvarusuario.senha).toBe(userdata.senha);
})

it('Não deve inserir usuario  com um campo  inexistente.',async () =>{
    //criando um usuario
    var invalidmodel = { nome: 'Lucas',email: 'lb@gmail.com',senha:"lucas123",telefone:'0000000000'};
    const userinvalido = new modelUsers(invalidmodel);
    //salvando o formulario
    const salvaruserinvalido = await userinvalido.save();
    //verificando se é definido (existe)
    expect(salvaruserinvalido._id).toBeDefined();
    //verificar se o campo telefone é indefinido 
    expect(salvaruserinvalido.telefone).toBeUndefined();
});

it('Não deve criar  um usuario sem um campo obrigatorio ', async () => {
    //criando formulario so com o nome
    var userinvalid = { nome: 'Lucas', email:'lg@gmail.com'}
    const usuariosemcampo = new modelFormulario(userinvalid);
    let err;
    try {
        //tenta salvar
        const salvaruserinvalido = await usuariosemcampo.save();
        error = salvaruserinvalido;
    } catch (error) {
        //salva o erro
        err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    //verifica que esse campo tinha que ser definido
    expect(err.errors.senha).toBeUndefined();
});

it('Deve Encontrar o usuario cadastrado no banco',async()=>{
    const systemusers = await modelFormulario.findOne({ nome: 'Lucas' });
    expect(systemusers.nome).toEqual(userdata.nome);
    expect(systemusers.nome).toBeDefined();
})

})