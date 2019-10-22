const express = require('express');
const crypto = require('crypto');
const User = require('../models/Users');

const router = express.Router();

router.post('/recuperar_senha', async (req, res) => {
    const { email } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'Usuário não encontrado !' });
        }

        const token = crypto.randomBytes(20).toString('hex');  // Cria o token

        const now = new Date();
        now.setHours(now.getHours() + 1); //Define o tempo em que o token ficará ativo ( 1 hora )

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        console.log(token, now);

    } catch (error) {
        res.status(400).send({ error: 'Erro ao tentar recuperar senha.' })
    };
});

router.post('/redefinir_senha', async (req, res) => {

    const { email, token, senha } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');
        if (!user) {
            return res.status(400).send({ error: 'Usuário não encontrado !' });
        }
        if (token !== user.passwordResetToken) { //Verifica se o token é válido para o usuário
            return res.status(400).send({ error: 'Token inválido!' });
        }
        const now = new Date(); //Veririfica se o token já expirou
        if (now > user.passwordResetExpires) {
            res.status(400).send({ error: 'Token expirou!' });
        }
        const senhaCrypto = await crypto.createHash('md5').update(senha).digest('hex'); //Encripta a nova senha

        user.senha = senhaCrypto;

        await user.save();

        res.send()

    } catch (error) {
        res.status(400).send({ error: 'Erro ao redefinir senha.' })
    }
});

module.exports = router;