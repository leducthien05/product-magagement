const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/user.controller");
const validate = require("../../validate/client/register.validate");
const validateLogin = require("../../validate/client/login.validate");

router.get("/register", controller.register);

router.post("/register",validate.register, controller.addUser);

router.get("/login", controller.login);
router.post("/login", validateLogin.login, controller.loginPost);

router.get("/logout", controller.logout);

module.exports = router;