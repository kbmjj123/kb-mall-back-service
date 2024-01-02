const jwt = require('jsonwebtoken');

module.exports = id => {
    console.info(process.env.JWT_SECRET)
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: Number(process.env.JWT_EXPIRES_IN_TIME) })
}