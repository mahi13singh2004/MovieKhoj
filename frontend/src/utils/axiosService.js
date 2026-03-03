import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://moviekhoj-backend.onrender.com",
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) {
            error.message = "Network error - please check your connection";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;