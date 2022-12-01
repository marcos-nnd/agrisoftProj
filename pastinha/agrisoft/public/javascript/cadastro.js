function verificacao_senha() {
    var senha = in_senha.value;
    var conf_senha = in_confirmacao_senha.value;
    
    if (conf_senha != senha) {
        alerta.innerHTML = `
            <p style="color: red;">
            As senhas devem ser iguais!
            </p> 
        `
    } else {
        alerta.innerHTML = ``
    }
}

function senhaValida() {
    var senha = in_senha.value;
    var frase_alerta = "Não foi possível realizar o cadastro!<br> A senha deve ter 8 digitos!"
        
    if (senha.length == 8) {
        var letraMaiuscula = senha.match(/[A-Z]/);
        var letraMinuscula = senha.match(/[a-z]/);
        var numeros = senha.match(/[0-9]/);

        if (letraMaiuscula && letraMinuscula && numeros) {
            
            regra_senha.innerHTML = ``

            alerta.innerHTML = `
                Cadastro realizado com sucesso!
            `
        
        } else {
            regra_senha.innerHTML = ""
            alerta.innerHTML = `
                <p style="color: red;">
                    A senha deve conter letra minúscula,
                    letra maiuscula e um numero.
                </p>
                `
        }

    } else {
        alerta.innerHTML += `
            <p style="color: red;">
            ${frase_alerta}
            </p>
        `
    }
}

function cadastrar() {
    var nome = in_nome.value;
    var email = in_email.value;
    var senha = in_senha.value;
    var conf_senha = in_confirmacao_senha.value;
    var cnpj = in_cnpj.value;
    var frase_alerta = "Não foi possível realizar o cadastro!<br> Verifique se os campos foram preenchidos corretamente."


    if (nome == '' || 
        email == '' || 
        senha == '' || 
        conf_senha != senha || 
        cnpj == '') {

        alerta.innerHTML = `
            <p style="color: red;">
            ${frase_alerta}
            </p>
        `
    
    } else if (email.endsWith("@gmail.com") == false) {
        alerta.innerHTML = `
            <p style="color: red;">
            ${frase_alerta} <br>
            O e-mail inserido é inválido.
            </p>
        `

    } else if (cnpj.length != 14) {
        alerta.innerHTML = `
            <p style="color: red;">
            ${frase_alerta}
            </p>
        `

    } else {
        senhaValida()
    }
}