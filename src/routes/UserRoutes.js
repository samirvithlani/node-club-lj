const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController")
router.get("/user",userController.getAllUsers)
//post/
//put/
//delete/
module.exports = router