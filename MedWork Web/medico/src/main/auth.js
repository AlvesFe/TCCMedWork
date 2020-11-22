import getMedico from "./api/getMedico";

export const isAuth = () => {
    const user = localStorage.getItem('current_user');
    user ? getMedico() : null
    return user ? true : false
}