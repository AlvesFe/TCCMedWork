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
        case "errodadosjainseridos":
            Toast.fire({
                icon: 'error',
                title: 'Dados Já Cadastrado!'
            })
            break;
        case "Dados Encontrados":
            Toast.fire({
                icon: 'success',
                title: 'Dados Encontrados!'
            })
            break;
        case "errocrmvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o CRM!'
            })
            break;
        case "erroespecialidadevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Especialidade!'
            })
            break;
        case "errocelularvazio":
            Toast.fire({
                icon: 'error',
                title: 'Celular Invalido!'
            })
            break;
        case "errodt_Nascimentovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Data de Nascimento'
            })
            break;
        case "errotp_sanguineovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Tipo Sanguíneo'
            })
            break;
        case "errocpfvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o CPF'
            })
            break;
        case "errorgvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o RG'
            })
            break;
        case "errotamanhocpf":
            Toast.fire({
                icon: 'error',
                title: 'CPF invalido!'
            })
            break;
        case "errocpfinvalido":
            Toast.fire({
                icon: 'error',
                title: 'CPF não Econtrado!'
            })
            break;
        case "errotamanhorg":
            Toast.fire({
                icon: 'error',
                title: 'RG invalido!'
            })
            break;
        case "Medico Cadastrado":
            Toast.fire({
                icon: 'success',
                title: 'Medico Cadastrado!'
            })
            break;
        case "Recepcionista Cadastrado":
            Toast.fire({
                icon: 'success',
                title: 'Recepcionista Cadastrada!'
            })
            break;
        case "Encontrado":
            Toast.fire({
                icon: 'success',
                title: 'Dados Encontrados!'
            })
            break;
        case "Não Encontrado":
            Toast.fire({
                icon: 'error',
                title: 'Dados Não Encontrados!'
            })
            break;
    }


}