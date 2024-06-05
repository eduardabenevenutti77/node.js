const { where } = require('sequelize');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error } = require('console');
const JWT_SECRET_KEY = 'your_secret_key';

const saltRounds = 10;

class UserController {
    async newUser(req, res) {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, E-mail e Senha são obrigatórios!' });
        }
        try {
            const secretPassword = await bcrypt.hash(senha, saltRounds);
            const user = await User.create({ nome, email, senha: secretPassword });
            const hipermidia = this.hipermidia(user);
            return res.status(201).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async showId(req, res) {
        const { AutorID } = req.params;
        if (!AutorID) {
            return res.status(400).json({ error: 'O id autor é obrigatório!' });
        }
        try {
            const user = await User.findByPk(AutorID);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }
            const hipermidia = this.hipermidia(user);
            return res.status(200).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
        const { AutorID } = req.params;
        const { nome, email, senha } = req.body;
        if (!AutorID || !nome || !email || !senha) {
            return res.status(400).json({ error: 'Id, nome, e-mail e senha são obrigatórios' });
        }
        try {
            const user = await User.findByPk(AutorID);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }
            user.nome = nome;
            user.email = email;
            const secretPassword = await bcrypt.hash(senha, saltRounds);
            user.senha = secretPassword;
            await user.save();
            const hipermidia = this.hipermidia(user);
            return res.status(200).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res) {
        const { AutorID } = req.params;
        if (!AutorID) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }
        try {
            const user = await User.findByPk(AutorID);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado!' });
            }
            await user.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async showUser(req, res) {
        try {
            const users = await User.findAll();
            const hipermidia = users.map(user => this.hipermidia(user));
            return res.status(200).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                return res.status(401).json({ error: 'Senha inválida' });
            }
            const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY);
            return res.status(200).json({ token: jwtToken });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async validarToken(req, res) {
        const { token } = req.body;
        try {
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            return res.status(200).json(payload);
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    }

    hipermidia(user) {
        const AutorID = user.id;
        return {
            ...user.toJSON(),
            links: [
                { rel: "self", href: `/api/v1/user`, method: "GET" },
                { rel: "self", href: `/api/v1/user/${AutorID}`, method: "GET" },
                { rel: "update", href: `/api/v1/user/${AutorID}`, method: "PUT" },
                { rel: "delete", href: `/api/v1/user/${AutorID}`, method: "DELETE" },
                { rel: "insert", href: "/api/v1/user", method: "POST" }
            ]
        };
    }
}
module.exports = new UserController();