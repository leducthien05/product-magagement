const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCloud = require("../../middleware/admin/uploadcloud.middleware");
const upload = multer();
const controller = require("../../controller/admin/product-category.controller");
const validateProduct = require("../../validate/admin/product.validate");
//[GET] admin/product-category
router.get('/', controller.index);

//[PATCH] admin/product-category/changeStatus
router.patch('/changeStatus/:status/:id', controller.changeStatus);

//[POST] admin/product-category/change-multi
router.patch('/change-multi', controller.changeMulti);

//[GET] admin/product-category/create
router.get('/create', controller.create);

//[POST] admin/product-category/create
router.post('/create',
    upload.single("thumbnail"),
    validateProduct.createItem,
    uploadCloud.uploadonline,
    controller.createItem
);









module.exports = router; 