const express = require('express');
const crypto = require('crypto');
const User = require('../models/Users');

const router = express.Router();

router.post('/recuperar_senha', async (req, res) => {});

router.post('/redefinir_senha', async (req, res) => {});

module.exports = router;