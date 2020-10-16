// models/ErrorReport.js 

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let errorReportSchema = new Schema({
    date:{
        type: Date,
    },
    user_id:{
        type: String,
    },
    description:{
        type: String,
    }

}, {
    collection: 'errorReports'
})

module.exports = mongoose.model('ErrorReport', errorReportSchema)