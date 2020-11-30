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
        case "Dados Encontrados":
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
        case "errodt_Nascimentovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Data de Nascimento!'
            })
            break;
        case "erronomevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Nome!'
            })
            break;
        case "errotelefonevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Telefone!'
            })
            break;
        case "errotp_sanguineovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Tipo Sanguíneo!'
            })
            break;
        case "erroalergiavazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe as Alergias!'
            })
            break;
        case "errorgvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o RG!'
            })
            break;
        case "errocpfvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o CPF!'
            })
            break;
        case "erroenderecovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Endereço!'
            })
            break;
        case "errocelularvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Celular!'
            })
            break;
        case "errotamanhotelefone":
            Toast.fire({
                icon: 'error',
                title: 'Telefone Invalido!'
            })
            break;
        case "errotamanhorg":
            Toast.fire({
                icon: 'error',
                title: 'RG Invalido!'
            })
            break;
        case "errotamanhocpf":
            Toast.fire({
                icon: 'error',
                title: 'CPF Invalido!'
            })
            break;
        case "errocpfinvalido":
            Toast.fire({
                icon: 'error',
                title: 'CPF Invalido!'
            })
            break;
        case "Paciente Cadastrado":
            Toast.fire({
                icon: 'success',
                title: 'Paciente Cadastrado!'
            })
            break;
        case "errodadosjainseridos":
            Toast.fire({
                icon: 'error',
                title: 'Dados Já Cadastrado!'
            })
        case "erroemailinvalido":
            Toast.fire({
                icon: 'error',
                title: 'Email Invalido!'
            })
            break;
        case "erroemailvazio":
            Toast.fire({
                icon: 'error',
                title: 'Email Invalido!'
            })
            break;
        case "Email não Encontrado":
            Toast.fire({
                icon: 'error',
                title: 'Email não Encontrado!'
            })
            break;
        case "Verifique Seu Email":
            Toast.fire({
                icon: 'success',
                title: 'Verifique Seu Email!'
            })
            break;
        case "Altere Sua Senha":
            Toast.fire({
                icon: 'success',
                title: 'Altere Sua Senha!'
            })
            break;
        case "Senha Alterada com Sucesso":
            Toast.fire({
                icon: 'success',
                title: 'Senha Alterada com Sucesso!'
            })
            break;
        case "Ficha Gerada":
            Toast.fire({
                icon: 'success',
                title: 'Ficha Gerada!'
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
                title: 'Erro a Alterar!'
            })
            break;
        case "errodt_nascimentovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Data de Nascimento!'
            })
            break;
        case "errotamanhocelular":
            Toast.fire({
                icon: 'error',
                title: 'Celular Invalido!'
            })
            break;
    }


}