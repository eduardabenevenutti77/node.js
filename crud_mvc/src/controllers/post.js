const Post = require('../models/post');

class PostController {
    async newPost(titulo, conteudo, AutorID) {
        if (titulo === undefined || conteudo === undefined || AutorID === undefined) {
            throw new Error('titulo, conteudo e autoID são obrigatórios');
        }
        const post = await Post.create({ titulo, conteudo, AutorID });
        return post;
    }
    async showId(postId) {
        if (postId === undefined) {
            throw new Error('O id de postagens é obrigatório!');
        }
        const post = await Post.findByPk(postId);
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
    async showPost() {
        return Post.findAll();
    }
}

module.exports = PostController;