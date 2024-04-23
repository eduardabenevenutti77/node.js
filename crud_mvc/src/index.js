const express = require('express');
const UserApi = require('../src/api/user');
const PostApi = require('../src/api/post');
const database = require('../src/config/database');
// const { error } = require('console');
// const sync = require('sync');

console.log('Iniciando servidor...');
const app = express();
app.use(express.json());

/* rotas usuário */
// app.post('/login', UserApi.login);
app.post('/users', UserApi.newUser);
app.get('/users/', UserApi.showUser);
app.put('/users/:id', UserApi.updateUser);
app.delete('/users/:id', UserApi.deleteUser);

/* rotas postagens */
app.post('/post', PostApi.newPost);
app.get('/post/', PostApi.showPost);
app.get('/postAutor/:id', PostApi.showPostIDAutor);
app.get('/post/:id', PostApi.showPostIDPost);
app.put('/post/:id', PostApi.updatePost);
app.delete('/post/:id', PostApi.deletePost);

database.db.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('O servidor está rodando na porta 3000')
        })
    })
    .catch((error) => {
        console.error('Erro ao conectar com o banco de dados', error);
    })