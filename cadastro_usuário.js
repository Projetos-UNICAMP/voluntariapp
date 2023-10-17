document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById('userForm');

    // Função para validar CPF
    function validaCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');

        if (cpf.length !== 11) return false;

        // Verificar se é uma sequência de números repetidos, que é inválida
        if (/^(\d)\1+$/.test(cpf)) return false;

        let soma = 0, resto;

        for (let i = 1; i <= 9; i++) 
            soma += parseInt(cpf.substring(i-1, i)) * (11 - i);

        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) 
            soma += parseInt(cpf.substring(i-1, i)) * (12 - i);

        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const cpf = document.getElementById('cpf').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const dob = document.getElementById('dob').value;

        try {
            // Verificar se os campos estão vazios
            if (!username || !email || !password || !cpf || !city || !state || !dob) {
                alert('Todos os campos são obrigatórios!');
                return;
            }

            // Validar o CPF
            if (!validaCPF(cpf)) {
                alert('CPF inválido!');
                return;
            }

            // Converter a data de nascimento para o formato dd/mm/aaaa
            const dobFormatted = new Date(dob).toLocaleDateString('pt-BR');

            const user = {
                username,
                email,
                password,
                cpf,
                city,
                state,
                dob: dobFormatted
            };

            // Aqui, você pode enviar o objeto 'user' para um servidor ou armazená-lo localmente
            console.log("Usuário cadastrado:", user);

        } catch (error) {
            // Tratar qualquer erro que possa ocorrer durante o processo de cadastro
            console.error("Ocorreu um erro durante o cadastro:", error);
            alert('Ocorreu um erro durante o cadastro. Por favor, tente novamente.');
        }
    });
});
