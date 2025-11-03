const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const autenticar = require('../middlewares/autenticacao.js'); 

const caminhoProdutos = path.join(__dirname, '../dados/produtos.json');

const lerProdutos = () => {
    try {
        const data = fs.readFileSync(caminhoProdutos, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Erro ao ler produtos:", error);
        return [];
    }
};

const escreverProdutos = (produtos) => {
    try {
        fs.writeFileSync(caminhoProdutos, JSON.stringify(produtos, null, 4), 'utf8');
    } catch (error) {
        console.error("Erro ao escrever produtos:", error);
    }
};

router.post('/adicionar', autenticar, (req, res) => {
    const novosProdutos = req.body;

    if (!novosProdutos.nome || !novosProdutos.preco) {
        return res.status(400).json({ erro: "Nome e preço são obrigatórios." });
    }

    const produtos = lerProdutos();
    const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    
    produtos.push({ id: novoId, ...novosProdutos });

    escreverProdutos(produtos);

    res.status(201).json({ mensagem: "Produto adicionado com sucesso!", id: novoId });
});

router.put('/editar/:id', autenticar, (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido." });
    }
    
    const produtos = lerProdutos();
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }

    produtos[index] = { id: id, ...dadosAtualizados };

    escreverProdutos(produtos);

    res.json({ mensagem: `Produto ID ${id} atualizado com sucesso.` });
});

router.delete('/:id', autenticar, (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: "ID inválido." });
    }

    let produtos = lerProdutos();
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }

    produtos = produtos.filter(p => p.id !== id);

    escreverProdutos(produtos);

    res.json({ mensagem: `Produto ID ${id} deletado com sucesso.` });
});


module.exports = router;