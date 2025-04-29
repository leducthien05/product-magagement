const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
const uploadCloud = require("../../middleware/admin/uploadcloud.middleware");
const controller = require("../../controller/admin/account.controller");
const validate = require("../../validate/admin/accounts.validate");


router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",
    upload.single("avatar"),
    validate.createItem,
    uploadCloud.uploadonline,
    controller.createItem
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
    upload.single("avatar"),
    validate.editItem,
    controller.editItem
)


module.exports = router;