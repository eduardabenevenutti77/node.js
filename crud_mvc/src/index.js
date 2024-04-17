const express = require('express');
const userApi = require('../src/api/user');
const postApi = require('../src/api/post');
const database = require('../src/config/database');

console.log('Iniciando servidor...');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ response: 'API - USERS & POST'});
})
