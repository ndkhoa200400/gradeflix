import Cookies from 'js-cookie'
const savePreUrl = (url) =>{
    Cookies.set('preUrl', url);
}
const loadPreUrl = () =>{
    return Cookies.get('preUrl');
}
export {savePreUrl, loadPreUrl}