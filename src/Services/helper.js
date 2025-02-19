import axios from "axios";

export const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const myAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add an interceptor to include the token in every request

myAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Let axios set the content type automatically based on the data type
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
