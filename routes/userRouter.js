const express = require("express")

const userRouter = express.Router();

const userController = require("../controllers/userController")

const passport = require('passport');

userRouter.get("/", userController.firstFunction)
userRouter.post("/login", userController.login)

userRouter.get("/:id", passport.authenticate('jwt', { session: false }), userController.getUserInfo)


userRouter.post("/register", userController.createUser)


module.exports = userRouter