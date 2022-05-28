const AuthController = require("../controllers/Auth.controller");
const express = require("express");
const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController.registerController);

AuthRouter.post("/login", AuthController.loginController);

AuthRouter.post("/emailVerification", AuthController.emailVerificationController);

AuthRouter.post("/verifyUser", AuthController.verifyUser);

module.exports = AuthRouter;
