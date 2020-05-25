// models/Markers.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let markerSchema = new Schema({
    name : {
        type: String
    },
    loc: {
        type: { type: String },
        coordinates: [Number]
    },
    map_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Maps'
    }
}, {
    collection: 'markers'
})

module.exports = mongoose.model('Marker', markerSchema)