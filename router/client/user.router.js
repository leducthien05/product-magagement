const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/user.controller");
const validate = require("../../validate/client/register.validate");
const validateLogin = require("../../validate/client/login.validate");
const validateUser = require("../../validate/client/user.validate");
const authenMiddleware = require("../../middleware/client/auth.middleware");

router.get("/register", controller.register);

router.post("/register",validate.register, controller.addUser);

router.get("/login", controller.login);
router.post("/login", validateLogin.login, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/passwordForgot", controller.passwordForgot);
router.post("/password/passwordForgot", controller.passwordForgotPost);

router.get("/password/otp", controller.passwordOtp);
router.post("/password/otp", validateUser.otp, controller.passwordOtpPost);

router.get("/password/reset", controller.resetPassword);
router.post("/password/reset", validateUser.resetPassword, controller.resetPasswordPost);

router.get("/info",authenMiddleware.requireAuth, controller.info);

module.exports = router;