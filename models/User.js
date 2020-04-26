// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    role: {
        type: Number
    },
    age: {
        type: Number
    },
    gender: {
        type: Number
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
})

userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('User', userSchema)