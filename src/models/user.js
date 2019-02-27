const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    email: String,
    avatar: String,
    created_on: {
        type: Date,
        default: Date.now()
    },
    created_by: String,
    modified_on: Date,
    modified_by: String
})

const user = mongoose.model('users', userSchema)

module.exports = user