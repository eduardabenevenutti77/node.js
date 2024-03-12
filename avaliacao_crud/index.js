const express = require('express');
const mysql = require('mysql');
const {Connection} = require('mysql12');

const app = express();
app.use(express.json);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud',
    port: 3306,
});

connection.connect((err) => {
    if (err) {
        console.error(' Erro ao conectar ao banco de dados: ', err);
    } else {
        console.log(' Conexão bem-sucedido ao banco de dados! ');
    }
});

process.on('SIGINT', () => {
    connection.end();
    process.exit;
});

const Port = 3000;
app.listen(Port, () => {
    console.log(`Servidor ouvindo na porta: ${Port}`);
});