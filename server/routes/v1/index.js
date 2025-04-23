
const movieRouter = require('./movieRoutes')
const reviewRouter = require('./reviewRoutes')
const { userRouter } = require('./userRoutes')

const v1Router = require('express').Router()

v1Router.use("/user", userRouter)
v1Router.use("/movie", movieRouter)
v1Router.use("/review", reviewRouter)


module.exports = {
    v1Router
}

