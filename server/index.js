const express = require('express')
const { dbConnection } = require('./config/dbConnection')
const apiRouter = require('./routes')
const cors = require('cors')
const cookieparser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
}))
dbConnection()

app.get("/", (req, res) => [
        res.json("Server started")
    ])
    

app.use("/api", apiRouter)

app.listen(process.env.PORT, () => {
        console.log(`server starts at port ${process.env.PORT}`)
})
