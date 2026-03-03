import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://moviekhoj-backend.onrender.com",
    withCredentials: true
});

// Health check function
export const checkBackendHealth = async () => {
    try {
        const response = await axiosInstance.get("/api/health", { timeout: 10000 });
        return { isHealthy: true, data: response.data };
    } catch (error) {
        return {
            isHealthy: false,
            error: error.message || "Backend is not responding"
        };
    }
};

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