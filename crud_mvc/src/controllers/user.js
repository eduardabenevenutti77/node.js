const User = require('../models/user');

class UserController {
    async newUser(nome, email) {
        if (nome === undefined || email === undefined) {
            throw new Error('Nome e E-mail são obrigatórios!');
        }
        const user = await User.create({ nome, email });
        return user;
    }
    async showId(AutorID) {
        if (AutorID === undefined) {
            throw new Error('O id autor é obrigatório!');
        }
        const user = await User.findByPk(AutorID);
        if (!user) {
            throw new Error('Usuário não encontrado!')
        }
        return user;
    }
    async updateUser(AutorID, nome, email) {
        if (AutorID === undefined || nome === undefined || email === undefined) {
            throw new Error('Id, nome e e-mail são obrigatórios');
        }
        const user = await this.showId(AutorID);
        user.nome = nome;
        user.email = email;
        user.save();
        return user;
    }
    async deleteUser(AutorID) {
        if (AutorID === undefined) {
            throw new Error('O id é obrigatório!');
        }
        const user = await this.showId(AutorID);
        user.destroy();
    }
    async showUser() {
        return User.findAll();
    }
}

module.exports = UserController;