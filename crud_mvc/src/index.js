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
app.post('/api/v1/login', UserApi.login);
app.post('/api/v1/user', UserApi.newUser);
app.get('/api/v1/user', UserApi.showUser);
app.put('/api/v1/user/:AutorID', UserApi.updateUser);
app.delete('/api/v1/user/:AutorID', UserApi.deleteUser);

/* rotas postagens */
app.post('/api/v1/post', PostApi.newPost);
app.get('/api/v1/post', PostApi.showPost);
app.get('/api/v1/postAutor/:AutorID', PostApi.showPostIDAutor);
app.get('/api/v1/post/:idPost', PostApi.showPostIDPost);
app.put('/api/v1/post/:idPost', PostApi.updatePost);
app.delete('/api/v1/post/:idPost', PostApi.deletePost);

database.sync({ force: false })
    .then(() => {
        app.listen(3000, () => {
            console.log('O servidor está rodando na porta 3000')
        })
    })
    .catch((error) => {
        console.error('Erro ao conectar com o banco de dados', error);
    })