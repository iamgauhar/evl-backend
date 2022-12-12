const mongoose = require("mongoose")

const UserModel = mongoose.model("users", mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    user_IP: String
}))
module.exports = {UserModel}