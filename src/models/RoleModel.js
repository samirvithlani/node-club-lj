const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema = new Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type: String,
    }


})
module.exports = mongoose.model('Role', roleSchema);