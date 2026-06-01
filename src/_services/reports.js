import api from './api';

export const reportService = {
    getReports,
    createReport,
    updateReport,
    deleteReport,
};

async function getReports(params = {}) {
    try {
        const query = new URLSearchParams(params).toString();
        const res = await api.get(`reports${query ? `?${query}` : ''}`);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function createReport(data) {
    try {
        const res = await api.post('reports', data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function updateReport(id, data) {
    try {
        const res = await api.put(`reports/${id}`, data);
        return res;
    } catch (error) {
        return error.response;
    }
}

async function deleteReport(id) {
    try {
        const res = await api.delete(`reports/${id}`);
        return res;
    } catch (error) {
        return error.response;
    }
}
