document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formPessoa');
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    const pessoasList = document.getElementById('pessoasList');

    // insta carregar as pessoas
    loadPessoas();

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // pegando forms
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;

        try {
            // POST
            const response = await fetch('http://localhost:3000/pessoa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone
                })
            });

            if (response.ok) {
                showAlert('Pessoa cadastrada com sucesso!', 'success');
                form.reset();
                loadPessoas();
            } else {
                const errorData = await response.json();
                showAlert(`Erro ao cadastrar pessoa: ${errorData.error}`, 'danger');
            }
        } catch (error) {
            showAlert('Erro ao comunicar com o servidor!', 'danger');
        }
    });

    // alerta
    function showAlert(message, type) {
        alertPlaceholder.innerHTML = `
            <div class="alert alert-${type}" role="alert">
                ${message}
            </div>
        `;

        // sai depois de 3s
        setTimeout(() => {
            alertPlaceholder.innerHTML = '';
        }, 3000);
    }

    // carregar as pessoas funcao
    async function loadPessoas() {
        pessoasList.innerHTML = ''; // limpa

        try {
            const response = await fetch('http://localhost:3000/pessoas');
            const pessoas = await response.json();

            pessoas.forEach(pessoa => {
                const pessoaItem = document.createElement('div');
                pessoaItem.classList.add('pessoa-item');
                pessoaItem.innerHTML = `
                    <p><strong>${pessoa.nome}</strong></p>
                    <p>CPF: ${pessoa.cpf}</p>
                    <p>Telefone: ${pessoa.telefone}</p>
                    <button class="btn btn-warning btn-sm" onclick="window.updatePessoa(${pessoa.id})">Atualizar</button>
                    <button class="btn btn-danger btn-sm" onclick="window.deletePessoa(${pessoa.id})">Deletar</button>
                    <hr>
                `;
                pessoasList.appendChild(pessoaItem);
            });
        } catch (error) {
            showAlert('Erro ao carregar lista de pessoas!', 'danger');
        }
    }

    // att a pessoa por id
    window.updatePessoa = async function(id) {
        const nome = prompt('Digite o novo nome:');
        const cpf = prompt('Digite o novo CPF:');
        const telefone = prompt('Digite o novo telefone:');

        if (nome && cpf && telefone) {
            try {
                const response = await fetch(`http://localhost:3000/pessoa/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, cpf, telefone })
                });

                if (response.ok) {
                    showAlert('Pessoa atualizada com sucesso!', 'success');
                    loadPessoas();
                } else {
                    showAlert('Erro ao atualizar pessoa!', 'danger');
                }
            } catch (error) {
                showAlert('Erro ao comunicar com o servidor!', 'danger');
            }
        }
    };

    // deleta id
    window.deletePessoa = async function(id) {
        if (confirm('Tem certeza que deseja deletar esta pessoa?')) {
            try {
                const response = await fetch(`http://localhost:3000/pessoa/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    showAlert('Pessoa deletada com sucesso!', 'success');
                    loadPessoas();
                } else {
                    showAlert('Erro ao deletar pessoa!', 'danger');
                }
            } catch (error) {
                showAlert('Erro ao comunicar com o servidor!', 'danger');
            }
        }
    };
});
