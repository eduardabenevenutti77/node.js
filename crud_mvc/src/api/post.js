const PostController = require('../controllers/post');

class PostApi {
    async newPost(req, res) {
        const titulo = req.body.nome;
        const conteudo = req.body.email;
        const AutorID = req.body.AutorID;
        try {
            const post = await PostController.newPost(titulo, conteudo, AutorID);
            return res.status(201).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async updatePost(req, res) {
        const {idPost} = req.params;
        const {titulo, conteudo, AutorID} = req.body;
        const controller = new PostController();
        try {
            const post = await controller.updatePost(Number(idPost), titulo, conteudo, AutorID);
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async deletePost(req, res) {
        const {idPost} = req.params;
        const controller = new PostController();
        try {
            await controller.deletePost(Number(idPost));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async showPost(req, res) {
        const controller = new PostController();
        try {
            const post = await controller.showPost();
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = PostApi;