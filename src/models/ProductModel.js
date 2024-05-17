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
        colors:[{
            type: String
        }]
        
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("Product",productSchema) //db.Users.find()