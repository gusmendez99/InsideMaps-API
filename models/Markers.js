// models/Markers.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let markerSchema = new Schema({
    type: {
        type: String
    },
    name : {
        type: String
    },
    img: {
        type: String
    },
    coordinates:{
        type: [Number]
    },
    level:{
        type: Number
    },
    map_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Maps'
    },
    asociaciones:{
        type: Map,
        of: Number
    }
}, {
    collection: 'markers'
})

module.exports = mongoose.model('Marker', markerSchema)
