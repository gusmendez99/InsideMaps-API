// models/Logbook.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let logbookSchema = new Schema({
    date :{
        type: Date
    },
    user_id:{
        type: String
    },
    destination_id:{
        type: String
    }
}, {
    collection: 'logbooks'
})

module.exports = mongoose.model('Logbook', logbookSchema)