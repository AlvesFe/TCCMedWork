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
                title: 'Informe o Nome!'
            })
            break;
        case "erroenderecovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Endereço!'
            })
            break;
        case "errotelefonevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Telefone!'
            })
            break;
        case "errotelefoneinvalido":
            Toast.fire({
                icon: 'error',
                title: 'Telefone Invalido!'
            })
            break;
        case "errotaxavazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Taxa!'
            })
            break;
        case "errodetalhesvazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe os Detalhes!'
            })
            break;
        case "erronaoencontrado":
            Toast.fire({
                icon: 'error',
                title: 'Dados Não Encontrado!'
            })
            break;
        case "success":
            Toast.fire({
                icon: 'success',
                title: 'Dados Encontrados!'
            })
            break;
        case "errodt_Validadevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Data de Vencimento!'
            })
            break;
        case "errotarjavazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Tarja!'
            })
            break;
        case "errocodigovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Codigo!'
            })
            break;
        case "errodescricaovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe a Descrição!'
            })
            break;
        case "errofabricantevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Fabricante!'
            })
            break;
        case "erroprecovazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Preço!'
            })
            break;
        case "erroestoquevazio":
            Toast.fire({
                icon: 'error',
                title: 'Informe o Estoque!'
            })
            break;
        case "errourlinvalida":
            Toast.fire({
                icon: 'error',
                title: 'Url Invalida!'
            })
            break;
    }


}