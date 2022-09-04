const mongoose = require("mongoose");


//user schema 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token:String,
})

const User = new mongoose.model("User", userSchema)

module.exports = User;