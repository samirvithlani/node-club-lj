const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json()) //middleware
app.use(express.urlencoded({extended:true})) //middleware

//require routes
const userRoutes = require("./src/routes/UserRoutes")
const productRoutes = require("./src/routes/ProductRoutes")
const cartRoutes = require("./src/routes/CartRoutes")
const uploadRoutes = require("./src/routes/UploadRoutes")



//use routes

//what is use of use : it is used to use the routes and middleware
//localhost:3000/users 
// -->app --> userRoutes --> userController --> userModel --> userController --> app --> response
app.use("/users",userRoutes)
app.use("/products",productRoutes)
app.use("/cart",cartRoutes)
app.use("/upload",uploadRoutes)
//localhost:3000/users/user



mongoose.connect("mongodb://127.0.0.1:27017/node_backup").then(()=>{
    console.log("Connected to database...")
}).catch((err)=>{
    console.log("Error connecting to database...",err)
})


console.log("app.js")
const PORT = 3000
app.listen(PORT,()=>{
    console.log('Server is running on port ' + PORT);
})