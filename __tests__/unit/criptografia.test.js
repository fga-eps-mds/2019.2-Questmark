
const crypto = require('crypto');
var senha = "12345";


describe('Teste de criptografia',()=>{
    it('as senhas devem ser iguais',()=>{
        expect(senha).toBe("12345");
    })

    it('Deve ser diferente as senhas criptografada',()=>{
        const senhaCrypto = crypto.createHash('md5').update(senha).digest('hex');
        expect(senhaCrypto).not.toEqual(senha);
        expect(senhaCrypto).toBeDefined();
    })
})

