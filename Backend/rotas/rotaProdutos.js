const express = require("express");
const router = express.Router();
const fs = require("fs")
const path = require('path'); 


const PRODUTOS_FILE = path.join(__dirname, '..', 'dados', 'produtos.json');


router.get("/", (req, res) => {
    fs.readFile(PRODUTOS_FILE, "utf8", (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                 return res.status(200).json([]);
            }
            return res.status(500).json({ error: 'Erro ao ler o arquivo.' }); 
        }
        try {
            const produtos = JSON.parse(data)
            res.status(200).json(produtos) 
        } catch (error) {
            res.status(500).json({ error: "Erro ao converter o arquivo JSON." }) 
        }
    })
})


router.get("/:id", (req, res) => {
    fs.readFile(PRODUTOS_FILE, "utf8", (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                 return res.status(404).json({ mensagem: "Produto não existe!" });
            }
            return res.status(500).json({ error: 'Erro ao ler o arquivo.' }); 
        }
        try {
            const produtos = JSON.parse(data)
            const id = parseInt(req.params.id) 
            const produtoEncontrado = produtos.find((produto) => {
                return produto.id === id 
            })
            
            if (!produtoEncontrado) { 
                return res.status(404).json({ mensagem: "ID não existe!" }); 
            }
            res.status(200).json(produtoEncontrado) 
        } catch (error) {
            res.status(500).json({ error: "Erro ao converter o arquivo JSON." }) 
        }
    })
})

module.exports = router;