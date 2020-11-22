import getMedWork from "./api/getMedWork";

export const isAuth = () => {
    const user = localStorage.getItem('current_user');    
    user ? getMedWork() : null
    return user ? true : false 
};