import axios from "axios";
const url = import.meta.env.VITE_BASE_URL

export const adminInstance = axios.create({
    baseURL: url
})

adminInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("admin-token")
    request.headers.Authorization = `Bearer ${token}`
    return request;
})