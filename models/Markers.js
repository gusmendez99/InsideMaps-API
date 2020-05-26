// models/Markers.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let markerSchema = new Schema({
    name : {
        type: String
    },
    loc: {
        type: { type: String },
        coordinates: []
    },
    map_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Maps'
    }
}, {
    collection: 'markers'
})

markerSchema.index({loc:'2dsphere'});
module.exports = mongoose.model('Marker', markerSchema)
