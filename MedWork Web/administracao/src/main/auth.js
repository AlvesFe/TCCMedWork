export const isAuth = () => {
    const user = localStorage.getItem('current_user');    
    return user ? true : false 
};