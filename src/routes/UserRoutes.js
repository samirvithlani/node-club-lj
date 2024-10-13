const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserController")
const authmiddleware = require("../middleware/authmiddleware")
const zodMiddleware = require("../middleware/ZodMiddlewar")
const userValidationSchema = require("../utils/UserValidationSchema")

//apply middleware
//router.get("/user",authmiddleware.validateUser,userController.getAllUsers)
router.get("/user",userController.getAllUsers)
router.get("/user/:id",userController.getUserById)
router.get("/userbyname/:name",userController.getUserByNameFileter)
router.get("/userbyage",userController.getUserByAge)

router.post("/user",zodMiddleware.validateSchema(userValidationSchema),userController.addUser)

router.delete("/user/:id",userController.deleteUser)
router.put("/user/:id",userController.updateUser)
router.put("/softdeleteuser/:id",userController.softDeleteUser)
router.post("/login",userController.loginUser)
//post/
//put/
//delete/
module.exports = router