function limparFormulario() {
    document.getElementById('cadastrarUsu').reset();
}

document.getElementById("cadastrarUsu").addEventListener('submit', async function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    try {
        const response = await fetch('http://localhost:3000/postUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email })
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Cadastro de Usuário foi bem-sucedido: ', jsonResponse);
            window.location.href = '/avaliacao_crud/frontend/usuarios_principal.html';
            alert('Cadastro bem-sucedido!');
        } else {
            console.log('Cadastro Falhou. Detalhes: ', response.status, response.statusText, await response.json());
        }
    } catch (error) {
        console.error('Erro durante a solicitação: ', error.message);
        console.log('Resposta do Servidor: ', error.response?.text());
        if (error.response) {
            if (error.response.status === 401) {
                console.log('Cadastro de Usuário não autorizado!');
            } else {
                console.log('Outros status de erro: ', error.response.status)
            }
        } else {
            console.log('Erro desconhecido');
        }
    }
})