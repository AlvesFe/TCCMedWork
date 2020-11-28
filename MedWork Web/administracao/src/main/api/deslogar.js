import Swal from 'sweetalert2';

export function deslogar() {
    Swal.fire({
        title: 'Tem certeza?',
        text: 'Você será deslogado',
        icon:'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sair',
    }).then(result => {
        console.log(result.isConfirmed)

        if (result.isConfirmed) {
            localStorage.removeItem('current_user');
            localStorage.removeItem('user_data');
            window.location.reload();
        }
    })
}
