class User {

    static users = [];

    constructor(id, nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;

        // users.push(this);
    }

    constructor(nome, email, senha) {
        let id = 0;

        for (const user of users) {
            if (user.id > id) {
                id = user.id;
            }
        }
        this(id + 1, nome, email, senha);
        users.push(this); // representa o construtor de cima
    }
}