const jwt = require('jsonwebtoken')

const createToken = (id, role = "user") => {
    try {
        const token = jwt.sign({ id: id, role: role }, process.env.JWT_SECRETE);
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports = createToken