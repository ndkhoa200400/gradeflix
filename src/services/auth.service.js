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
		localStorage.removeItem('user')
}

/**
 * Save user information into local storage
 */
const saveUserInfo = (data) =>
{
    localStorage.setItem('user', JSON.stringify(data))
}

const getUserInfo = () =>{
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

export {isLoggedIn, saveToken, loadToken, logOut, saveUserInfo, getUserInfo};
