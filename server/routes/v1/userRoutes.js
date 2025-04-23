const { register, login, updateUser, deleteUser, userProfile, listUsers } = require('../../controllers/userController')
const AuthMiddleware = require('../../middlewares/AuthMiddleware')
const upload = require('../../middlewares/multer')
const userRouter = require('express').Router()

userRouter.post("/register", register) //Register
userRouter.post("/login", login) //login
userRouter.patch("/update", AuthMiddleware, upload.single("profilepic"), updateUser)  //update
userRouter.get("/profile", AuthMiddleware, userProfile) //view profile
userRouter.delete("/deleteuser/:userId", deleteUser) //delete user
userRouter.get("/listusers", listUsers) //list all users

module.exports = {
    userRouter
}