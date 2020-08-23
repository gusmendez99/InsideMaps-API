// models/Markers.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('debug', true);

let markerSchema = new Schema({
    type: {
        type: String
    },
    name : {
        type: String
    },
    node_id:{
        type: Number
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
    associates:{
        type: Map,
        of: Number
    }
}, {
    collection: 'markers'
})

module.exports = mongoose.model('Marker', markerSchema)
