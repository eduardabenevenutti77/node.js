const Post = require('../models/post');

class PostController {
    async newPost(titulo, conteudo, AutorID) {
        if (titulo === undefined || conteudo === undefined || AutorID === undefined) {
            throw new Error('titulo, conteudo e autoID são obrigatórios');
        }
        const post = await Post.create({ titulo, conteudo, AutorID });
    }
}