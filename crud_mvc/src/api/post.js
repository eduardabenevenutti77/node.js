const PostController = require('../controllers/post');

class PostApi {
    async newPost(req, res) {
        const titulo = req.body;
        const conteudo = req.body;
        const AutorID = req.body;
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
        try {
            const post = await PostController.updatePost(Number(idPost), titulo, conteudo, AutorID);
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async deletePost(req, res) {
        const {idPost} = req.params;
        try {
            await PostController.deletePost(Number(idPost));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async showPost(req, res) {
        try {
            const post = await PostController.showPost();
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async showPostIDAutor(req, res) {
        const {AutorID} = req.body;
        try {
            const post = await PostController.showPost(Number(AutorID));
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
    async showPostIDPost(req, res) {
        const {idPost} = req.body;
        try {
            const post = await PostController.showPost(Number(idPost));
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new PostApi();