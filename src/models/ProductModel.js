const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String
        },
        price:{
            type: Number,
        },
        
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("Product",productSchema) //db.Users.find()