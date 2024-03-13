const express = require('express');
const mysql = require('mysql');
const {Connection} = require('mysql2');

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

app.post('/postUsuario', (req, res) => {
    const {nome, email} = req.body;

    const query = 'INSERT INTO usuario (nome, email) VALUES (?, ?)';
    connection.query(query, [nome, email], (err, response) => {
        if (err) {
            console.error( 'Erro na consulta ao banco de dados: ', err);
            response.status(500).json({ success: false, error: 'Erro interno do servidor' });
            return;
        }
        response.status(200).json({ success: true, message: 'Usuário cadastrado com sucesso' });
        console.log( 'Dados recebidos do formulário - Cadastro de Usuário: ', { nome, email });
    });
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ouvindo na porta: ${PORT}`);
});