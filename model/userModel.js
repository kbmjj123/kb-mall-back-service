const mogoose = require('mongoose');

const userSchema = new mogoose.Schema({
    account: String,
    password: String,
    email: String
})
const userModel = mogoose.model('userModel', userSchema, "users");

module.exports = userModel;