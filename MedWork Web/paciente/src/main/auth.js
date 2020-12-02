import getPaciente from "./api/getPaciente";

export const isAuth = () => {
    const user = localStorage.getItem('current_user');
    user ? getPaciente() : null
    return user ? true : false
}