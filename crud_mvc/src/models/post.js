// id, titulo, conteudo, autorID

const database = require('../config/database');
const AutorID = require('../models/user');

class Post {
    constructor() {
        this.model = database.define('posts', {
            idPost: {
                type: database.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: database.Sequelize.STRING
            },
            conteudo: {
                type: database.Sequelize.STRING
            },
            autorID: {
                type: database.Sequelize.INTEGER,
                foreingKey: true,
            }
        });
    }
}

AutorID.belongsTo(AutorID, { foreingKey: 'AutorID' })

module.exports = (new Post).model;