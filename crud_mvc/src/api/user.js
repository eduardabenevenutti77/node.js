const UserController = require('../controllers/user')

class UserApi {
    async newUser(req, res) {
        const nome = req.body.nome;
        const email = req.body.email;
        const senha = req.body.senha;
        const controller = new UserController();
        try {
            const user = await controller.newUser(nome, email, senha);
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
        const controller = new UserController();
        try {
            const user = await controller.updateUser(Number(AutorID), nome, email, senha);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async deleteUser(req, res) {
        const { AutorID } = req.body;
        const controller = new UserController();
        try {
            await controller.deleteUser(Number(AutorID));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async showUser(req, res) {
        const controller = new UserController();
        try {
            const users = await controller.showUser();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const token = await controller.login(email, senha);
            return res.status(200).send(token);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    // Método para validar o token
    async validarToken(req, res, next) {
        const token = req.headers.authorization;
        try {
            await controller.validarToken(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new UserApi();