import getFarmacia from './api/getFarmacia'

export const isAuth = () => {
    const user = localStorage.getItem('current_user');
    user ? getFarmacia() : null
    return user ? true : false
}