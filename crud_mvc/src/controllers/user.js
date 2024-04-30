const { where } = require('sequelize');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { error } = require('console');

const saltRounds = 10;

class UserController {
    async newUser(nome, email, senha) {
        if (nome === undefined || email === undefined || senha === undefined) {
            // console.log(error);
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
            throw new Error('Id, nome, e-mail são obrigatórios');
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
            throw new Error('Email e senha são obrigatórios');
        }
        const user = await User.findOne({ where: { email }});
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            throw new Error('Senha inválida');
        }
        const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY);
        return { token: jwtToken }
    }

    async validarToken(token) {
        try {
            // Verifica se o token é válido e retorna o payload
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            return payload;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}

module.exports = UserController;