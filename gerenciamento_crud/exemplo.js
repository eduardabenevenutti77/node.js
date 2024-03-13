const express = require('express');

const app = express();
app.use(express.json());

const usuarios = [];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/usuario', (req, res) => {
    res.json(usuarios);
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

app.delete('/usuario/:id', (req, res) => {
    const { id } = req.params;

    const index = usuarios.findIndex(u => u.id === Number(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Usuário não encontrado'})
    }

    usuarios.splice(index, 1);

    res.status(204).send();
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})