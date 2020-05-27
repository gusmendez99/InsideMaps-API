// models/Markers.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let markerSchema = new Schema({
    name : {
        type: String
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    map_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Maps'
    }
}, {
    collection: 'markers'
})

module.exports = mongoose.model('Marker', markerSchema)
