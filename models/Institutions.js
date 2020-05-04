// models/Institutions.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let institutionSchema = new Schema({
    name : {
        type: String
    },
    address: {
        type: String,
        unique: true
    },
    id_admin: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        unique: true
    },
    phone_number: {
        type: String
    }
}, {
    collection: 'institutions'
})

institutionSchema.plugin(uniqueValidator, { message: 'address already in use' });
module.exports = mongoose.model('Institution', institutionSchema)