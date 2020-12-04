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
        case "erroemailvazio":
        case "erroemailinvalido":
            Toast.fire({
                icon: 'error',
                title: 'Email Não Encontrado!'
            })
            break;
        case "errortokenvazio":
        case "errotokeninvalido":
            Toast.fire({
                icon: 'error',
                title: 'Token Invalido!'
            })
            break;
        case "errosenhavazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe uma Senha!'
            })
            break;
        case "erroconfsenhavazio":
            Toast.fire({
                icon: 'error',
                title: 'Confirme a Senha!'
            })
            break;
        case "errosenhasnaoconferem":
            Toast.fire({
                icon: 'error',
                title: 'As Senha devem ser iguais!'
            })
            break;
        case "Verifique a Caixa de Email":
            Toast.fire({
                icon: 'success',
                title: 'Verifique a Caixa de Email!'
            })
            break;
        case "sucessotoken":
            Toast.fire({
                icon: 'success',
                title: 'Altere sua Senha!'
            })
            break;
        case "erronomevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Nome!'
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
        case "errocelularinvalido":
            Toast.fire({
                icon: 'error',
                title: 'Celular Invalido!'
            })
            break;
        case "errotelefonevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Telefone!'
            })
            break;
        case "erroalergiavazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Alergia!'
            })
            break;
        case "erroalergiavazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Alergia!'
            })
            break;
        case "Valor Invalido":
            Toast.fire({
                icon: 'error',
                title: 'Valor Invalido!'
            })
            break;
        case "ErroCompra":
            Toast.fire({
                icon: 'error',
                title: 'Falha ao Comprar!'
            })
            break;
        case "Compra Realizada":
            Toast.fire({
                icon: 'success',
                title: 'Compra Realizada!'
            })
            break;
    }


}