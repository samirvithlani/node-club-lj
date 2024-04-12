const userSchema = require("../models/UserModel")

const getAllUsers = async(req,res)=>{


    //db.Users.find()
    const users = await userSchema.find()
    res.json({
        message:"Users fetched...",
        data:users
    })



}
//
//
//

module.exports = {
    getAllUsers
}