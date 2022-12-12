const mongoose = require("mongoose")

const TodoModel = mongoose.model("tot", mongoose.Schema({
    taskname: String,
    status: String,
    tag: String,
    userID: String
}))

module.exports = {TodoModel}