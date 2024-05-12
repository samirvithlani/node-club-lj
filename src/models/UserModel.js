const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//db ->coll -->documnet
const userSchema = new Schema({
    name: {
        type: String
    },
    email:{
        type: String,
    },
    age:{
        type: Number
    },
    status:{
        type: Boolean,
        default: true
    },
    role:{
        type:Schema.Types.ObjectId,
        ref:"Role"
    }
    
})

//db.Users.find()
// mongoose.model("User",userSchema)
// module.exports = userSchema

module.exports = mongoose.model("User",userSchema) //db.Users.find()

