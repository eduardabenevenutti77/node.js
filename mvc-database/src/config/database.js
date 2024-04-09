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