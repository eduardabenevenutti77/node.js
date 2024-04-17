const { where } = require('sequelize');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;

class UserController {
    async newUser(nome, email, senha) {
        if (nome === undefined || email === undefined || senha === undefined) {
            throw new Error('Nome, E-mail e Senha são obrigatórios!');
        }
        const secretPassword = await bcrypt.hash(senha, saltRounds);
        const user = await User.create({ nome, email, senha: secretPassword });
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
    async updateUser(AutorID, nome, email, senha) {
        if (AutorID === undefined || nome === undefined || email === undefined || senha === undefined) {
            throw new Error('Id, nome, e-mail e senha são obrigatórios');
        }
        const user = await this.showId(AutorID);
        user.nome = nome;
        user.email = email;
        const secretPassword = await bcrypt.hash(senha, saltRounds);
        user.senha = secretPassword;
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
    async login(email, senha) {
        if (!email || !senha) {
            throw new Error('E-mail e senha são obrigatórios!');
        }
        const user = await User.findOne({ where: {email} });
        if (!user) {
            throw new Error('Usuário não foi encontrado!');
        }
        const correctPassword = await bcrypt.compare(senha. user.senha);
        if (!correctPassword) {
            throw new Error('Senha inválida');
        }

        console.log('Usuário logado com sucesso!');
    }
}

module.exports = UserController;