const express = require('express');
const UserApi = require('./api/user');
const PostApi = require('./api/post');
const database = require('./config/database');
// const { error } = require('console');
// const sync = require('sync');

console.log('Iniciando servidor...');
const app = express()
app.use(express.json())

/* rotas usuário */
app.post('/login', UserApi.login);
app.post('/users', UserApi.newUser);
app.get('/users/', UserApi.showUser);
app.put('/users/:AutorID', UserApi.updateUser);
app.delete('/users/:AutorID', UserApi.deleteUser);

/* rotas postagens */
app.post('/post', PostApi.newPost);
app.get('/post', PostApi.showPost);
app.get('/postAutor/:AutorID', PostApi.showPostIDAutor);
app.get('/post/:idPost', PostApi.showPostIDPost);
app.put('/post/:idPost', PostApi.updatePost);
app.delete('/post/:idPost', PostApi.deletePost);

database.sync({ force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('O servidor está rodando na porta 3000')
        })
    })
    .catch((error) => {
        console.error('Erro ao conectar com o banco de dados', error);
    })