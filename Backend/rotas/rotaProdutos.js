const express = require("express");
const router = express.Router();
const fs = require("fs")


router.get("/", (req, res) => {
    fs.readFile("", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo.' });
        }
        try {
            const tarefas = JSON.parse(data)
            res.status(200).json(tarefas)
        } catch (error) {
            res.status(500).send("Erro ao converter o arquivo")
        }
    })
})

router.get("/:id", (req, res) => {
    fs.readFile("./dados/produtos.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler o arquivo.' });
        }
        try {
            const tarefas = JSON.parse(data)
            const id = parseInt(req.params.id)
            const tarefaEncotrada = tarefas.find((tarefa) => {
                return tarefa.id === id
            })
            const index = tarefas.findIndex(t => t.id === id);
            if (index === -1) {
                return res.status(404).json({ mensagem: "ID não existe!" });
            }
            res.status(200).json(tarefaEncotrada)
        } catch (error) {
            res.status(500).send("Erro ao converter o arquivo")
        }
    })
})