// models/Maps.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let mapSchema = new Schema({
    name : {
        type: String
    },
    description: {
        type: String
    },
    id_place: {
        type: String
    },
    level: {
        type: Number
    },
    year: {
        type: Number
    },
    location: {
        type: Map
    },
    active:{
        type: Boolean
    },
    graph:{
        type: Map
    }
}, {
    collection: 'maps'
})

//mapSchema.plugin(uniqueValidator, { message: 'Map filename or qr_code already in use' });
//mapSchema.index({loc:'2dsphere'});
module.exports = mongoose.model('Map', mapSchema)