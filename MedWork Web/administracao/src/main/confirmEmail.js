export const confirmEmail = () => {
    const bool = localStorage.getItem('rec_senha');    
    return bool ? true : false
};