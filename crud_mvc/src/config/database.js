const Sequelize = require('sequelize');
const database = new Sequelize(
    'mvc_prova',
    'root',
    '',
    { host: 'localhost', dialect: 'mysql'}
)
module.exports = database;