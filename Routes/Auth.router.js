const AuthController = require("../controllers/Auth.controller");
const express = require("express");
const AuthRouter = express.Router();

AuthRouter.post("/register", AuthController.registerController);

AuthRouter.post("/login", AuthController.loginController);

AuthRouter.post("/emailVerification", AuthController.emailVerificationController);

module.exports = AuthRouter;
