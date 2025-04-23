
import { userInstance } from "../axios/axiosInstance"

//user login
export const userLogin = (data) => {
    return userInstance.post("/user/login", data)
}

//user registration
export const userSignup = (data) => {
    return userInstance.post("/user/register",data )
}

//user profile
export const userProfile = (data) => {
    return userInstance.post("/user/profile",data )
}

//user update
export const userUpdate = (data) => {
    return userInstance.patch("/user/update",data )
}


