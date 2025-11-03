

const autenticar = (req, res, next) => {
    const token = req.headers['authorization']
    if (token === 'oi'){
        next()
    } else{
        res.status(401).json({ erro: 'Não autorizado' }) 
    }
}

module.exports = autenticar