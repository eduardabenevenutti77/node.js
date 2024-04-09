const Sequelize = require('sequelize');
const database = new Sequelize(
    'javascript_mvc',
    'root',
    '',
    { host: 'localhost', dialect: 'mysql' }
)
module.exports = database;

// sequelize: depedencia para usar o banco de dados - ORM
// construção de modelos espelhados no banco de dados
// mongo: ODM
// ODM - NoSQL, mapeamento de documentos sql para objetos de código (mongo)
// ORM - SQL, mapeamento de tabelas de dados para objetos de código (sequelize)
// mongoose - biblioteca para node.js e mongo