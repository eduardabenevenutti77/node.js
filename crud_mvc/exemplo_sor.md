const express = require('express');

const app = express();
app.use(express.json());

const usuarios = [];
const postagens = []

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/usuario', (req, res) => {
    res.json(usuarios);
})

app.get('/postagem', (req, res) => {
    res.json(postagens);
})

app.get('/postagem/usuario/:id', (req, res) => {
    const { id } = req.params;

    const postagensUsuario = postagens.filter(p => p.autorId === Number(id))

    res.json(postagensUsuario);
})

app.post('/usuario', (req, res) => {
    const { nome, email } = req.body;

    let id = 0;

    for (const usuario of usuarios) {
        if (usuario.id > id) {
            id = usuario.id;
        }
    }

    const usuario = {
        id: id + 1,
        nome, 
        email
    } 
    usuarios.push(usuario)

    res.status(201).json(usuario)
})

app.post('/postagem', (req, res) => {
    const { titulo, conteudo, autorId } = req.body;

    let id = 0;

    // Verificar se o autorId existe nos usuários
    const usuario = usuarios.find(u => u.id === Number(autorId))
    
    if (!usuario) {
        return res.status(400).json({ error: 'Usuário não encontrado'})
    }

    for (const postagem of postagems) {
        if (postagem.id > id) {
            id = postagem.id;
        }
    }

    const postagem = {
        id: id + 1,
        titulo, 
        conteudo,
        autorId
    } 
    postagems.push(postagem)

    res.status(201).json(postagem)
})


app.put('/usuario/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    
    const index = usuarios.findIndex(u => u.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado'})
    }

    usuarios[index] = {
        id: Number(id),
        nome,
        email
    }

    res.status(200).json(usuarios[index]);
})

app.put('/postagem/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, autorId } = req.body;

    // Verificar se o autorId existe nos usuários
    const usuario = usuarios.find(u => u.id === Number(autorId))
    
    if (!usuario) {
        return res.status(400).json({ error: 'Usuário não encontrado'})
    }
    
    const index = postagens.findIndex(u => u.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Postagem não encontrada'})
    }

    postagens[index] = {
        id: Number(id),
        titulo,
        conteudo,
        autorId
    }

    res.status(200).json(postagens[index]);
})

app.delete('/usuario/:id', (req, res) => {
    const { id } = req.params;

    const index = usuarios.findIndex(u => u.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado'})
    }

    usuarios.splice(index, 1);

    res.status(204).send();
})


app.delete('/postagem/:id', (req, res) => {
    const { id } = req.params;

    const index = postagens.findIndex(u => u.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Postagem não encontrada'})
    }

    postagens.splice(index, 1);

    res.status(204).send();
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})