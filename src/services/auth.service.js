import Cookies from 'js-cookie'
const isLoggedIn = () =>{
    const token = loadToken();
    return token !== undefined && token !== "" && token !== null;
};
const saveToken = (token) =>{
    Cookies.set('token', token);
}
const loadToken = () =>{
    return Cookies.get('token');
}
const logOut = () =>{
    Cookies.remove('token')
}

export {isLoggedIn, saveToken, loadToken, logOut};