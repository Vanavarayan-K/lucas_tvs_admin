import axios from 'axios'
import { helpers } from '../_helpers/index.js';
import { data } from 'react-router-dom';



//default header and api endpoint config
export const userService = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getPortalData,
    getUserRoles,
    getProfileInfo,
    changePassword,
    updateProfile
};

async function getAllUsers(data) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    helpers.setHeader();
    try {
        const res = await axios.get(`/users/?page=${data.page}&limit=${data.pageSize}`, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function createUser(data) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.post(`/users/with-portal`, data, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
} 

async function updateUser(id, data) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.put(`/users/${id}/with-portal`, data, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
} 

async function deleteUser(id) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try {
        const res = await axios.delete(`/users/${id}/with-portal`, requestOptions);
        return res;
    } catch (error) {       
        return error.response;
    }
}   

async function getPortalData() {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    helpers.setHeader();
    try {
        const res = await axios.get(`/portals`, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function getUserRoles() {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    helpers.setHeader();
    try {
        const res = await axios.get(`/roles`, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function getProfileInfo() {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    helpers.setHeader();
    try {
        const res = await axios.get(`/auth/me`, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function changePassword(data) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    helpers.setHeader();
    try {
        const res = await axios.post(`/auth/change-password`, data, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
} 

async function updateProfile(data) {
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    helpers.setHeader();
    try {
        const res = await axios.put(`/auth/me`,data, requestOptions);
        return res;
    } catch (error) {
        return error.response;
    }
}