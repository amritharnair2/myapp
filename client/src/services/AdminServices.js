import { adminInstance } from "../axios/adminAxiosInstance"

//admin login
export const adminLogin = (data) => {
    return adminInstance.post("/admin/login", data)
}

export const addMovie = (data) => {
    return adminInstance.post("/movie/create", data)
}


export const updateMovie = (id, updatedMovie) => {
    return adminInstance.patch(`/movie/updatemovie/${id}`, updatedMovie)
}

export const deleteMovie = (id) => {
    return adminInstance.delete(`/movie/deletemovie/${id}`)
}

export const listUsers = (data) => {
    return adminInstance.get("/user/listusers", data)
}

export const listReviews = () => {
    return adminInstance.get("/review/listreviews")
}