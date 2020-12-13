const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperDetailSchema = new Schema({
    type: String,
    value: Schema.Types.Mixed,
}, { collection : 'developerDetails' });

module.exports = DevDetails = mongoose.model('DeveloperDetails', DeveloperDetailSchema);