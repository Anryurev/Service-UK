import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 60000
});

// Интерцептор для ошибок
api.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ECONNABORTED') {
            console.error('Timeout error');
        }
        return Promise.reject(error);
    }
);

export default api;