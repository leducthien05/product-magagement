const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/user.controller");
const validate = require("../../validate/client/register.validate");

router.get("/register", controller.register);

router.post("/register",validate.register, controller.addUser);

module.exports = router;