const express = require('express');

const app = express();
app.use(express.json());

const usuarios = [];
const postagens = [];

// mostra os usuários presente na lista
app.get('/usuario', (req, res) => {
    res.json(usuarios);
})

// inclui usuário na lista
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

// altera o usuário
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

// deleta usuário
app.delete('/usuario/:id', (req, res) => {
    const { id } = req.params;

    const index = usuarios.findIndex(u => u.id === Number(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado'})
    }

    usuarios.splice(index, 1);
    res.status(204).send();
})

// mostra as postagens presentes na lista
app.get('/postagem', (req, res) => {
    res.send(postagens);
})

// mostra postagem por determinado id do usuário
app.get('/postagemUsuario/:id', (req, res) => {
    const {id} = req.params;
    
    const index = usuarios.findIndex(u => u.id === Number(id));
    if (index === -1) {
        return res.status(404).json({ error: "Usuário não foi encontrada para mostrar suas publicações!" });
    }
    res.send(postagens);
})

// insere dados na lista 
app.post('/postagem', (req, res) => {
    const { tituloPostagem, conteudo, autorId } = req.body;
    const autor = usuarios.find(usuario => usuario.id === autorId);
    if (!autor) {
        return res.status(404).json({ error: "Não existe usuário com esse número de identificação!" });
    }

    let id = 0;
    for (const postagem of postagens) {
        if (postagem.id > id) {
            id = postagem.id;
        }
    }

    const novaPostagem = {
        id: id + 1,
        titulo: tituloPostagem,
        conteudo,
        autorId
    };
    postagens.push(novaPostagem);
    res.status(201).json(novaPostagem);
});

// altera dados na lista
app.put("/postagem/:id", (req, res) => {
    const {id} = req.params;
    const {tituloPostagem, conteudo} = req.body;

    const index = postagens.findIndex(u => u.id === Number(id));
    if (index === -1) {
        return res.status(404).json({ error: "Postagem não foi encontrada!" });
    }

    postagens[index] = {
        id: Number(id),
        tituloPostagem,
        conteudo
    }
    res.status(200).json(postagens[index]);
})

// deleta postagem por determinado id
app.delete('/postagem/:id', (req, res) => {
    const {id} = req.params;
    
    const index = postagens.findIndex(u => u.id === Number(id));
    if (index === -1) {
        return res.status(404).json({ error: "Postagem não foi encontrada!" });
    }

    postagens.splice(index, 1);
    res.status(204).send();
})

app.listen(3000, () => {
    console.log('O servidor está rodando na porta: 3000');
})