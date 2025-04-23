import axios from "axios";
const url = import.meta.env.VITE_BASE_URL

export const userInstance = axios.create({
    baseURL: url
})

userInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token")
    request.headers.Authorization = `Bearer ${token}`
    return request;
})