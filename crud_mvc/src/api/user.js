const UserController = require('../controllers/post')

class UserApi {
    async newUser(req, res) {
        const nome = req.body.nome;
        const email = req.body.email;
        const controller = new UserController();
        try {
            const user = await controller.newUser(nome, email);
            return res.status(201).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async updateUser(req, res) {
        const {AutorID} = req.params;
        const { nome, email } = req.params;
        const controller = new UserController();
        try {
            const user = await controller.updateUser(Number(AutorID), nome, email);
            return res.status(200).send(user);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async deleteUser(req, res) {
        const {AutorID} = req.params;
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
}

module.exports = UserApi;