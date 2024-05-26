const express = require("express");
const app = express();
const cors = require('cors')
const db = require("./db");
const port = 4000;
app.use(express.json())


const corOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}

app.use(cors(corOptions))

app.listen(port, async () => {
    console.log('App running');
})

//LIVRO - START
app.get('/livros', async (req, res) => {
    const livros = await db.selectAll();
    res.send(livros);
})

//LIVRO - END

//USER - START  
app.post('/users/cadstro', async (req, res) => {
    const user = {
        nome: req.body.nome,
        email: req.body.email, 
        senha: req.body.senha
    }
    const userResult = await db.cadastrUSer(user);
    res.send(userResult);
})

app.post('/users/login', async (req, res) => {
    const user = {
        email: req.body.email,
        senha: req.body.senha
    }
    const userResult = await db.login(user);
    res.send(userResult);
})

app.put('/users/putname/:id', async (req, res) => {
    const user = {
        id: req.params.id,
        nome: req.body.nome
    }
    await db.changeUserName(user);
    res.send();
})

app.get('/users/:id', async (rep, res) => {
    const user = await db.getUserByID(rep.params.id);
    res.send(user);
})

app.put('/users/putpassword/:id', async (req, res) => {
    const user = {
        id: req.params.id,
        senha: req.body.senha
    }
    await db.changeUserPassWord(user);
    res.send();
})

app.delete('/users/delete/:id', async (req, res) => {
    await db.deleteUserByID(req.params.id);
    res.send();
})

//USER - END

//COMENTARIO - START

app.post('/comentarios', async (req, res) => {
    const comentario = {
        texto: req.body.texto,
        user_id: req.body.user_id,
        livro_id: req.body.livro_id
    }

    const comentarioResult = await db.insertComentario(comentario);
    res.send(comentarioResult);
})

app.get('/comentarios/:livro_id', async (req, res) => {

    const fullResult = await db.selectAllComentariosById(req.params.livro_id);
    res.send(fullResult);
})

app.put('/comentarios/:id', async (req, res) => {
    const comentario = {
        id: req.params.id,
        texto: req.body.texto
    }

    const comentarioResult = await db.putComentario(comentario);
    res.send(comentarioResult);
})

app.delete('/comentarios/:id', async (req, res) => {
    await db.deleteComentario(req.params.id,);
    res.send()
})

//COMENTARIO - END

//AVALICAO - START

app.post('/avaliacoes', async (req, res) => {
    const avaliacao = {
        numero_estrelas: req.body.numero_estrelas,
        user_id: req.body.user_id,
        livro_id: req.body.livro_id
    }

    const avaliacaoResult = await db.insertAvaliacao(avaliacao);
    res.send(avaliacaoResult);
})

app.get('/avaliacoes/:user_id/:livro_id', async (req, res) => {

    const avaliacaoResult = await db.selectAvaliacaoById(req.params.user_id, req.params.livro_id);
    res.send(avaliacaoResult);
})

app.put('/avaliacoes/:id', async (req, res) => {
    const avaliacao = {
        id: req.params.id,
        numero_estrelas: req.body.numero_estrelas
    }

    const avaliacaoResult = await db.putAvaliacao(avaliacao);
    res.send(avaliacaoResult);
})

app.delete('/avaliacoes/:id', async (req, res) => {
    await db.deleteAvaliacao(req.params.id,);
    res.send()
})

//AVALICAO - END