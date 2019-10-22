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

router.post('/redefinir_senha', async (req, res) => { });

module.exports = router;