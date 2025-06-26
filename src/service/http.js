import axios from "axios";

let token = import.meta.env.VITE_API_TOKEN;
let http = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
});

http.interceptors.request.use(function (config) {
    config.headers.Authorization = "Bearer " + token;

    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(response => response, error => {
    return Promise.reject(error);
});

export default http;