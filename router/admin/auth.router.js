const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/auth.controller.js");
const validateAuth = require("../../validate/admin/auth.validate.js");

router.get("/login", controller.login);

router.post("/login",
    validateAuth.login, 
    controller.loginAccount
);

router.get("/logout", controller.logout);


module.exports = router;