const Post = require('../models/post');

class PostController {
    async newPost(titulo, conteudo, AutorID) {
        if (titulo === undefined || conteudo === undefined || AutorID === undefined) {
            throw new Error('titulo, conteudo e autoID são obrigatórios');
        }
        const post = await Post.create({ titulo, conteudo, AutorID });
        return post;
    }
    async showPost() {
        const post = await Post.findAll();
        if (!post) {
            throw new Error('Postagem não foi encontrada!');
        }
        return post;
    } 
    async showPostIDPost(idPost) {
        if (idPost === undefined) {
            throw new Error('O id do autor é obrigatório!');
        }
        const post = await Post.findByPk(idPost);
        if (!post) {
            throw new Error('Postagem não foi encontrada!');
        }
        return post;
    }
    async showPostIDAutor(AutorID) {
        if (AutorID === undefined) {
            throw new Error('O id do autor é obrigatório!');
        }
        const post = await Post.findByPk(AutorID);
        if (!post) {
            throw new Error('Postagem não foi encontrada!');
        }
        return post;
    }
    async updatePost(postId, titulo, conteudo, AutorID) {
        if (postId === undefined || titulo === undefined || conteudo === undefined || AutorID === undefined) {
            throw new Error('O id de postagem, título e conteúdo são obrigatórios');
        }
        const post = await this.showId(postId);
        post.titulo = titulo;
        post.conteudo = conteudo;
        post.AutorID = AutorID;
        post.save();
        return post;
    }
    async deletePost(postId) {
        if (postId === undefined) {
            throw new Error('O id é obrigatório');
        }
        const post = await this.showId(postId);
        post.destroy();
    }
}

module.exports = PostController;