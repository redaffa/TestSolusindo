const express = require('express')
const UserController = require('../Controllers/controller')
const router = express.Router()

router.post("/userRegister",UserController.registerUser)
router.post("/userLogin", UserController.loginUser)
router.get("/user",UserController.getAllUser)
router.get("/modeUser",UserController.modeUser)
router.get("/averageUsers",UserController.averageScoreUsers)
router.get("/averageAndModeUser", UserController.readModeAndAverageUserOnTheSameDate)
module.exports = router