import getHospital from "./api/getHospital";

export const isAuth = () => {
    const user = localStorage.getItem('current_user');
    user ? getHospital() : null
    return user ? true : false
}