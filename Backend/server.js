const express = require("express")
const app = express()
const cors = require("cors")
const port = 3001;
const rotaAdm = require('./rotas/rotaAdm')
const rotaProdutos = require("./rotas/rotaProdutos")
const logger = require('./middlewares/logger')

app.use(logger)
app.use(cors()); 
app.use(express.json());

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'phelipe.belo@gmail.com' && password === '1234') {
      return res.json({ token: 'oi' });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
})

app.use("/produtos", rotaProdutos)
app.use('/adm', rotaAdm)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
