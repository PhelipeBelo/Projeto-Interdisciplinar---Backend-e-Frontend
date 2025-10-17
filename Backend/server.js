const express = require("express")
const app = express()
const cors = require("cors")
const port = 3001;
const rotaProdutos = require("./rotas/rotaProdutos") // Certifica-se de que a importação está correta

app.use(cors()); 
app.use(express.json()); // Middleware para interpretar JSON

// Monta o roteador de produtos. 
// O Express agora aceita 'rotaProdutos' porque ele é uma função/Router válido.
app.use("/produtos", rotaProdutos)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
