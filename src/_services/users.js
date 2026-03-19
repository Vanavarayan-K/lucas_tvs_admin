import api from './api';

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
    try {
        const res = await api.get(`users/?page=${data.page}&limit=${data.pageSize}`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function createUser(data) {
    try {
        const res = await api.post(`users/with-portal`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function updateUser(id, data) {
    try {
        const res = await api.put(`users/${id}/with-portal`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function deleteUser(id) {
    try {
        const res = await api.delete(`users/${id}/with-portal`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function getPortalData() {
    try {
        const res = await api.get(`portals`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function getUserRoles() {
    try {
        const res = await api.get(`roles`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function getProfileInfo() {
    try {
        const res = await api.get(`auth/me`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function changePassword(data) {
    try {
        const res = await api.post(`auth/change-password`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function updateProfile(data) {
    try {
        const res = await api.put(`auth/me`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}