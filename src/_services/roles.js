import api from './api';

export const roleService = {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
    getRolePermissions,
    updateRolePermissions,
    getReports,
};

async function getRoles(params = {}) {
    try {
        const query = new URLSearchParams(params).toString();
        const res = await api.get(`roles${query ? `?${query}` : ''}`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function createRole(data) {
    try {
        const res = await api.post('roles', data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function updateRole(id, data) {
    try {
        const res = await api.put(`roles/${id}`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function deleteRole(id) {
    try {
        const res = await api.delete(`roles/${id}`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function getRolePermissions(roleId) {
    try {
        const res = await api.get(`roles/${roleId}/permissions`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function updateRolePermissions(roleId, permissions) {
    try {
        const res = await api.put(`roles/${roleId}/permissions`, { permissions });
        return res;
    } catch (error) {
        return error.response;
    }
}

async function getReports() {
    try {
        const res = await api.get('reports');
        return res;
    } catch (error) {
        return error.response;
    }
}
