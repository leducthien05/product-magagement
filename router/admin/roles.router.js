const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/roles.controller");

//[GET] admin/roles
router.get("/", controller.index);

//[GET] admin/roles/create
router.get("/create", controller.create);

//[GET] admin/roles/create
router.post("/create", controller.createItem);

//[GET] admin/roles/edit/:id
router.get("/edit/:id", controller.edit);

//[PATCH] admin/roles/edit/:id
router.patch("/edit/:id", controller.editItem)

module.exports = router;