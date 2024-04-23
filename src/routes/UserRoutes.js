const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController")
router.get("/user",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/userbyname/:name",userController.getUserByNameFileter)
router.get("/userbyage",userController.getUserByAge)
//post/
//put/
//delete/
module.exports = router