const express=require("express")
const { getAllUsers, registerController, loginController } = require("../controllers/userController")


// router obkect
const router=express.Router()

// getall users
router.get("/all-users",getAllUsers)

//create user|| post
router.post('/register',registerController)

// login||post
router.post('/login',loginController)
module.exports=router