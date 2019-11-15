const express = require('express');
const crypto = require('crypto');
const User = require('../models/Users');
const sgMail = require('@sendgrid/mail');
const router = express.Router();
sgMail.setApiKey("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");

router.get('/forgot', (req, res) => {
    res.render('./usuarios/solicitar_nova_senha', { status: false });
});

router.post('/recuperar_senha', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.render('./usuarios/solicitar_nova_senha', { status: true })
        };
        const token = crypto.randomBytes(5).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
        const msg = {
            to: email,
            from: 'no-reply@questmark.com.br',
            subject: 'Recuperar senha - Questmark',
            text: 'E-mail para recuperação de senha no Questmark',
            html: `<p>Utilize o seguinte código em nosso site ${token} </p>
            <p>Se você não solicitou a troca de senha, por favor desconsidere este e-mail.`,
        };
        await sgMail.send(msg);
        res.render('usuarios/definir_nova_senha', { notUser: false, notToken: false, tokenExpires: false });
    } catch (error) {
        res.send({ msg: ['Falha ao salvar o questionário.'], status: false });
    };
});

router.post('/redefinir_senha', async (req, res) => {
    const { email, token, senha } = req.body;
    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');
        if (!user) {
            res.render('usuarios/definir_nova_senha', { notUser: true, notToken: false, tokenExpires: false });
        };
        if (token !== user.passwordResetToken) {
            res.render('usuarios/definir_nova_senha', { notUser: false, notToken: true, tokenExpires: false });
        };
        const now = new Date();
        if (now > user.passwordResetExpires) {
            res.render('usuarios/definir_nova_senha', { notUser: false, notToken: false, tokenExpires: true });
        };
        const senhaCrypto = await crypto.createHash('md5').update(senha).digest('hex');
        user.senha = senhaCrypto;
        await user.save();
        res.send();
        res.redirect('/users/login');
    } catch (error) {
        res.status(400).send({ error: 'Erro ao redefinir senha.' });
    };
});

module.exports = router;