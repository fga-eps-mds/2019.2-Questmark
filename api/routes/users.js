const router = require('express').Router();
let User = require('../models/users.model');


//Rota users/  --  "Mostra todos os usuários cadastrados"
router.route('/').get((req,res) => {
    User.find()  //Procura todos os usuários
        .then(users => res.json(users))
        .catch(error => res.status(400).json(`Erro : ${error}`));
});

// Rota users/create  --  Cria um novo usuário
router.route('/create').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    const newUser = new User({username,email}); //User é a model criada

    newUser.save() //Salva o usuário
        .then(() => res.json('Usuário Criado.'))
        .catch(error => res.status(400).json(`Erro : ${error}`));
});

module.exports = router;