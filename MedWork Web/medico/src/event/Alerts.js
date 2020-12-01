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
        case "erroidremediovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Codigo do Remedio!'
            })
            break;
        case "Informe o CPF":
            Toast.fire({
                icon: 'error',
                title: 'CPF Invalido!'
            })
            break;
        case "errodosagemvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Dosagem!'
            })
            break;
        case "erroorientacoesvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe as Orientações!'
            })
            break;
        case "errodt_Validadevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Validade!'
            })
            break;
        case "errodt_Validadevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Validade!'
            })
            break;
        case "erroQuantidadevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Quantidade!'
            })
            break;
        case "erroquantidadeinvalida":
            Toast.fire({
                icon: 'error',
                title: 'Quantidade Invalida!'
            })
            break;
        case "Receita_Remedio Cadastrada":
            Toast.fire({
                icon: 'success',
                title: 'Receita Cadastrada!'
            })
            break;
        case "erronomevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Nome!'
            })
            break;
        case "erroespecialidadevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Especialidade!'
            })
            break;
        case "errotelefonevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Telefone!'
            })
            break;
        case "errocelularvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Celular!'
            })
            break;
        case "errodt_Nascimentovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Data de Nascimento!'
            })
            break;
        case "errotp_sanguineovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Tipo Sanguíneo!'
            })
            break;
        case "errotelefoneinvalido":
            Toast.fire({
                icon: 'error',
                title: 'Telefone Invalido!'
            })
            break;
        case "errotamanhotelefone":
            Toast.fire({
                icon: 'error',
                title: 'Telefone Invalido!'
            })
            break;
        case "errotamanhoceleular":
            Toast.fire({
                icon: 'error',
                title: 'Celular Invalido!'
            })
            break;
        case "Medico Atualizado":
            Toast.fire({
                icon: 'success',
                title: 'Medico Atualizado!'
            })
            break;
        case "Verifique Seu Email":
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
        case "Email Não Encontrado":
            Toast.fire({
                icon: 'error',
                title: 'Email Não Encontrado!'
            })
            break;
        case "Altere Sua Senha":
            Toast.fire({
                icon: 'success',
                title: 'Altere Sua Senha!'
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
        case "Erro a Alterar":
            Toast.fire({
                icon: 'error',
                title: 'Erro a Alterar!'
            })
            break;
        case "Senha Alterada com Sucesso":
            Toast.fire({
                icon: 'success',
                title: 'Senha Alterada com Sucesso!'
            })
            break;
    }


}