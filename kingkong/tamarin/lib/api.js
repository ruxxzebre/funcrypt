import axios from "axios";

const BC_BACKEND_PORT = 8080;
export const BC_BASE_URL = `http://localhost:${BC_BACKEND_PORT}`;
export const getBCURL = (str) => `${BC_BASE_URL}/${str}`;

// Blockchain API
export const bAPI = axios.create({
    baseURL: BC_BASE_URL,
});
