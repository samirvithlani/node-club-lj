const userSchema = require("../models/UserModel")

const getAllUsers = async(req,res)=>{

    //db.Users.find()
    const users = await userSchema.find()
    res.json({
        message:"Users fetched...",
        data:users
    })

}
const getUserByNameFileter = async(req,res)=>{

    const name  = req.params.name
    const user = await userSchema.find({name:name})
    console.log("user...",user)

    if(user && user.length>0){
        res.json({
            message:"User fetched...",
            data:user
        })
    }
    else{
        res.json({
            message:"User not found!!!",
        })
    }



}

const getUserById = async(req,res)=>{


    const id = req.params.id
    console.log(id)

    const user = await userSchema.findById(id)
    console.log("user...",user)
    res.json({
        message:"User fetched...",
        data:user
    })

}

const getUserByAge = async(req,res)=>{
    //insted of req.params we will use req.query
    console.log("req query..",req.query)
    const age = req.query.age
    const user = await userSchema.find({age:age})
    //if else...
    res.json({
        message:"User fetched...",
        data:user
    })

}


module.exports = {
    getAllUsers,
    getUserById,
    getUserByNameFileter,
    getUserByAge
}