const { Router } = require("express");
const userController = require("../controller/userController.cjs");

const userRouter = Router();

userRouter.get("/", userController.userListGet);
userRouter.get("/create", userController.usersCreateGet);
userRouter.post("/create", userController.userCreatePost);
userRouter.get("/:id/update", userController.userUpdateGet);
userRouter.post("/:id/update", userController.userUpdatePost);
userRouter.post("/:id/delete", userController.userDeletePost);

module.exports = { userRouter };
