const Sequelize = require('sequelize');
const database = new Sequelize(
    'mvc_gerenciamento',
    'root',
    ' ',
    { host: 'localhost', dialect: 'mysql'}
)
module.exports = database;