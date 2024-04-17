const Sequelize = require('sequelize');
const mongoose = require('mongoose');

class Database {
    constructor() {
        this.init();
        this.mongoInit();
    }

    init() {
        this.db = new Sequelize(
            'bancoDoMVC',
            'postgres-mvc',
            'postgres',
            { host: 'localhost', dialect: 'postgres' }
        )
    }

    mongoInit() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/mvc',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
    }
}

module.exports = new Database();