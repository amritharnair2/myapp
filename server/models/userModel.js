const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyzK2fuK3gDNJMRMKGHwHXfyqd6X1pL4lAxg&s"
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
}, {timestamps: true})

const userDb = new mongoose.model("users", userSchema)

module.exports = userDb