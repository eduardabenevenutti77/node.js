const Post = require('../models/post');

class PostController {
    async newPost(req, res) {
        const { titulo, conteudo, AutorID } = req.body;
        if (titulo === undefined || conteudo === undefined || AutorID === undefined) {
            return res.status(400).json({ error: 'titulo, conteudo e AutorID são obrigatórios' });
        }
        try {
            const post = await Post.create({ titulo, conteudo, AutorID });
            const hipermidia = this.hipermidia(post);
            return res.status(201).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async showPost(req, res) {
        try {
            const posts = await Post.findAll();
            const hipermidia = posts.map(post => this.hipermidia(post));
            return res.status(200).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async showPostIDPost(req, res) {
        const { idPost } = req.params;
        if (!idPost) {
            return res.status(400).json({ error: 'O id do post é obrigatório!' });
        }
        try {
            const post = await Post.findByPk(idPost);
            if (!post) {
                return res.status(404).json({ error: 'Postagem não foi encontrada!' });
            }
            const hipermidia = this.hipermidia(post);
            return res.status(200).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async showPostIDAutor(req, res) {
        const { AutorID } = req.params;
        if (!AutorID) {
            return res.status(400).json({ error: 'O id do autor é obrigatório!' });
        }
        try {
            const posts = await Post.findAll({ where: { AutorID } });
            if (!posts.length) {
                return res.status(404).json({ error: 'Postagem não foi encontrada!' });
            }
            const hipermidia = posts.map(post => this.hipermidia(post));
            return res.status(200).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updatePost(req, res) {
        const { idPost } = req.params;
        const { titulo, conteudo, AutorID } = req.body;
        if (idPost === undefined || titulo === undefined || conteudo === undefined || AutorID === undefined) {
            return res.status(400).json({ error: 'O id de postagem, título e conteúdo são obrigatórios' });
        }
        try {
            let post = await Post.findByPk(idPost);
            if (!post) {
                return res.status(404).json({ error: 'Postagem não foi encontrada!' });
            }
            post.titulo = titulo;
            post.conteudo = conteudo;
            post.AutorID = AutorID;
            await post.save();
            const hipermidia = this.hipermidia(post);
            return res.status(200).json(hipermidia);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deletePost(req, res) {
        const { idPost } = req.params;
        if (idPost === undefined) {
            return res.status(400).json({ error: 'O id é obrigatório' });
        }
        try {
            const post = await Post.findByPk(idPost);
            if (!post) {
                return res.status(404).json({ error: 'Postagem não foi encontrada!' });
            }
            await post.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    hipermidia(post) {
        const idPost = post.id;
        const AutorID = post.AutorID;
        return {
            ...post.toJSON(),
            links: [
                { rel: "self", href: `/api/v1/posts`, method: "GET" },
                { rel: "author-posts", href: `/api/v1/posts/author/${AutorID}`, method: "GET" },
                { rel: "self", href: `/api/v1/posts/${idPost}`, method: "GET" },
                { rel: "update", href: `/api/v1/posts/${idPost}`, method: "PUT" },
                { rel: "delete", href: `/api/v1/posts/${idPost}`, method: "DELETE" },
                { rel: "create", href: "/api/v1/posts", method: "POST" }
            ]
        };
    }
}

module.exports = new PostController();