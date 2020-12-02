
export const isAuth = () => {
    const user = localStorage.getItem('current_user');
    user ? getRecepcionista() : null
    return user ? true : false
}