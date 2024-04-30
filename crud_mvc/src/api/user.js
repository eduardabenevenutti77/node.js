const UserController = require('../controllers/user')

class UserApi {
    async newUser(req, res) {
        const nome = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;
        try {
            const user = await UserController.newUser(nome, email, senha);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async updateUser(req, res) {
        const { AutorID } = req.body;
        const { nome } = req.body;
        const { email } = req.body;
        const { senha } = req.body;
        try {
            const user = await UserController.updateUser(Number(AutorID), nome, email, senha);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async deleteUser(req, res) {
        const { AutorID } = req.body;
        try {
            await UserController.deleteUser(Number(AutorID));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async showUser(req, res) {
        try {
            const users = await UserController.showUser();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const token = await UserController.login(email, senha);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async validarToken(req, res, next) {
        const token = req.headers.authorization;
        try {
            await UserController.validarToken(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new UserApi();