import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'center-right',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
})

export default function Event(Action) {

    switch (Action) {
        case "errocnpjvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o CNPJ!'
            })
            break;
        case "errotamanhocnpj":
            Toast.fire({
                icon: 'error',
                title: 'CNPJ Invalido!'
            })
            break;
        case "erronomevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe um Nome!'
            })
            break;
        case "erroenderecovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe um Endereço!'
            })
            break;
        case "errotelefonevazio":
            Toast.fire({
                icon: 'error',
                title: 'Telefone Invalido!'
            })
            break;
        case "erroemailvazio":
            Toast.fire({
                icon: 'error',
                title: 'Email Invalido!'
            })
            break;
        case "errosenhavazio":
            Toast.fire({
                icon: 'error',
                title: 'Digite uma Senha!'
            })
            break;
        case "errotamanhotelefone":
            Toast.fire({
                icon: 'error',
                title: 'Telefone Invalido!'
            })
            break;
        case "erroemailinvalido":
            Toast.fire({
                icon: 'error',
                title: 'Email Invalido!'
            })
            break;
        case "errotamanhosenha":
            Toast.fire({
                icon: 'error',
                title: 'Senha deve Conter 8 Digitos!'
            })
            break;
        case "errocnpjinvalido":
            Toast.fire({
                icon: 'error',
                title: 'CNPJ não Encontrado!'
            })
            break;
        case "Hospital Cadastrado":
            Toast.fire({
                icon: 'success',
                title: 'Hospital Cadastrado!'
            })
            break;
        case "Farmacia Cadastrado":
            Toast.fire({
                icon: 'success',
                title: 'Farmacia Cadastrada!'
            })
            break;
        case "errodadosjainseridos":
            Toast.fire({
                icon: 'error',
                title: 'Dados Já Cadastrado!'
            })
            break;
        case "errodetalhesvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe os Detalhes!'
            })
            break;
        case "errotaxavazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Taxa de Entrega!'
            })
            break;
        case "Dados Encontrados":
            Toast.fire({
                icon: 'success',
                title: 'Dados Encontrados!'
            })
            break;
        case "Verifique Email":
            Toast.fire({
                icon: 'success',
                title: 'Verifique Seu Email!'
            })
            break;
        case "Email Não Encontrado":
            Toast.fire({
                icon: 'error',
                title: 'Email Não Encontrado!'
            })
            break;
        case "Codigo Invalido":
            Toast.fire({
                icon: 'error',
                title: 'Codigo Invalido!'
            })
            break;
        case "Erro a Alterar":
            Toast.fire({
                icon: 'error',
                title: 'erro a Alterar!'
            })
            break;
        case "Altere Sua Senha":
            Toast.fire({
                icon: 'success',
                title: 'Altere Sua Senha!'
            })
            break;
        case "Não Encontrado":
            Toast.fire({
                icon: 'error',
                title: 'Não Encontrado!'
            })
            break;
        case "errotelefoneinvalido":
        case "errortamanhotelefone":
            Toast.fire({
                icon: 'error',
                title: 'Telefone Invalido!'
            })
            break;
        case "Sucesso Alteracao":
            Toast.fire({
                icon: 'success',
                title: 'Sucesso Alterção!'
            })
            break;
    }


}