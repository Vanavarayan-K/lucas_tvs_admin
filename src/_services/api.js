import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
    (config) => {
        const token = cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors (like 401 Unauthorized)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle logout logic here if needed (e.g., clear cookies, redirect to login)
            // cookies.remove('token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
