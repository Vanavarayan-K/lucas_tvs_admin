import { Foggy } from '@mui/icons-material';
import axios from 'axios'


//default header and api endpoint config
export const loginService = {
    userLogin,
    forgotPassword,
    resetPassword,
};

async function userLogin(data) {
    console.log(data)
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.post(`/auth/login`, data, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function forgotPassword(data) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.post(`/auth/forgot-password`, data, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function resetPassword(data) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };  
    try {
        const res = await axios.post(`/auth/reset-password`, data, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
}

