// models/Markers.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let markerSchema = new Schema({
    name : {
        type: String
    },
    local_number: {
        type: Number
    },
    longitude: {
        type: mongoose.Decimal128
    },
    latitude: {
        type: mongoose.Decimal128
    },
    map_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Maps'
    }
}, {
    collection: 'markers'
})

module.exports = mongoose.model('Marker', markerSchema)