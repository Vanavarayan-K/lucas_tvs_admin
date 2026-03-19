import api from './api';

//default header and api endpoint config
export const loginService = {
    userLogin,
    forgotPassword,
    resetPassword,
};

async function userLogin(data) {
    try {
        const res = await api.post(`auth/login`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function forgotPassword(data) {
    try {
        const res = await api.post(`auth/forgot-password`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function resetPassword(data) {
    try {
        const res = await api.post(`auth/reset-password`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}
