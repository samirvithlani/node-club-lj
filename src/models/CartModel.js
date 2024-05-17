const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
        user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // product:{
    //     type: Schema.Types.ObjectId,
    //     ref: "Product"
    // }
    
    products:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
    },

    {
        timestamps: true
    }


)
module.exports = mongoose.model("Cart",cartSchema) //db.Users.find()