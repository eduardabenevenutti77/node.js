class UserController {
    criarUsuario(nome, email, senha) {
        // criando usuário
        if (nome === undefined || email === undefined || senha === undefined) {
            throw new Error("Dado inválido!");
        }
        return new User(nome, email, senha);
    }

    buscarID(id) {
        if (id === undefined) {
            throw new Error('Id inválido');
        }
        const user = User.users.find(u => u.id === id);
        if (user === -1) {
            throw new Error('Usuário não foi localizado');
        }
        return user;
    }

    alterarUsuario(id, nome, email, senha) {
        // alterando usuário
        if ( id === undefined || nome === undefined || email === undefined || senha === undefined) {
            throw new Error('Dados Inválidos!');
        }
        const index = this.buscarID(id);

        const user = new User(id, nome, email, senha)
        User.users[index] = user;

        return user;
    }

    deletarUsuario(id) {
        if (id === undefined) {
            throw new Error('Id inválido!')
        }
        const index = this.buscarID(id);
        User.users.splice(index, 1);
    }

    listarUsuario() {
        return User.users;
    }
}