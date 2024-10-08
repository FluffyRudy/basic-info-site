const { Router } = require("express");
const asyncHandler = require("express-async-handler");

const userRouter = Router();
const userController = require("../controller/UserController.cjs")

userRouter.get('/', asyncHandler(userController.getUser));


module.exports = { userRouter };