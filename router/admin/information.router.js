const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer();
const uploadCloud = require("../../middleware/admin/uploadcloud.middleware");
const controller = require("../../controller/admin/information.controller");

router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch("/edit",
    upload.single("avatar"),
    uploadCloud.uploadonline,
    controller.editItem
);

module.exports = router;