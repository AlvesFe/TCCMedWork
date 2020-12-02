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
    }


}