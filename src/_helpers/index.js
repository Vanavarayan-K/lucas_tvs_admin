import Cookies from 'universal-cookie';

import axios from 'axios'



const cookies = new Cookies();

export const helpers = {
    getCookies,
    //setCookies,
    removeCookies,   
    checkFileSize,
    setHeader,
    setHeaderForSignature
};

function checkFileSize(size){
    if(size>2097152){       
        return true;
    }
    else {
        return false
    }
}
function getCookies(name){
    return cookies.get(name)
}
function removeCookies(name) {
    return cookies.remove(name)
}
function setHeader() {
    const token = helpers.getCookies("token")
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
}

function setHeaderForSignature() {
    const token = helpers.getCookies("signToken")
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
}



