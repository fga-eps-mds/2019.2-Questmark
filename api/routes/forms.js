const router = require('express').Router();
let Form = require('../models/forms.model');

//Rota forms/  --  Mostra todos os formulários
router.route('/').get((req,res) => {
    Form.find() //Procura todos os formulários
        .then(forms => res.json(forms))
        .catch(error => res.status(400).json(`Erro : ${error}`));
});

//Rota forms/create  --  Cria um novo formulário
router.route('/create').post((req,res) => {
    const username = req.body.username;
    const formname = req.body.formname;
    const content = req.body.content;

    const newForm = new Form({username,formname,content});  // Form é uma instancia da model criada

    newForm.save() //Salva o formulário
        .then(() => res.json('Formulário Criado'))
        .catch(error => res.status(400).json(`Erro : ${error}`));
});

//Rota forms/id  --  Mostra um formulário específico
router.route('/:id').get((req,res) => {
    Form.findById(req.params.id)
        .then(form => res.json(form))
        .catch(error => res.status(400).json(`Erro : ${error}`));
});

router.route('/:id').delete((req, res) => {
    Form.findByIdAndDelete(req.params.id)
        .then(() => res.json('Formulário removido.'))
        .catch(error => res.status(400).json(`Erro : ${error}`));
});

router.route('/update/:id').post((req,res) => {
    Form.findById(req.params.id)
        .then(form => {
            form.username = req.body.username;
            form.formname = req.body.formname;
            form.content = req.body.content;

            form.save()
                .then(() => res.json('Formulário atualizado.'))
                .catch(error => res.status(400).json(`Erro : ${error}`));
        })
        .catch(error => res.status(400).json(`Erro : ${error}`));
});

module.exports = router;