const express = require('express');
const router = express.Router();

const SIMPLES_TOKEN = 'token-secreto-nexus-admin-12345'; 

const ADMIN_USER = {
    email: 'admin@nexus.com',
    senha: 'senha123',
};

router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    if (email === ADMIN_USER.email && senha === ADMIN_USER.senha) {
        
        return res.json({
            mensagem: 'Login bem-sucedido!',
            token: SIMPLES_TOKEN,
        });

    } else {
        return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }
});

module.exports = router;