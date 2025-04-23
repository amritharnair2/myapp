const jwt = require('jsonwebtoken')
const userDb = require("../models/userModel");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        console.log(authHeader, "header");
        const authToken = authHeader && authHeader.split(" ")[1];
        if (!authToken) return res.status(400).json({ error: "no auth token" });
        const decoded = jwt.verify(authToken, process.env.JWT_SECRETE)
        const user = await userDb.findOne({ _id: decoded.id })
        if (!user) return res.json({ error: "User not Found" })
        req.userId = decoded.id
        req.userRole = user.role;
        next()
    } catch (error) {
        console.log(error, "error");
        return res.status(error.status || 500).json({ error: "Please Login" })
    }
}