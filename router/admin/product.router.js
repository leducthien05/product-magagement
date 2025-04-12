const express = require("express");
const router = express.Router();
const multer = require('multer');
const uploadCloud = require("../../middleware/admin/uploadcloud.middleware")
//Upload ảnh vào file upload
// const storage = require("../../helper/storageMulter");
//const upload = multer({ storage: storage() });
 const upload = multer();

const controller = require("../../controller/admin/product.controller");
const validateProduct = require("../../validate/admin/product.validate");


router.get('/', controller.product);

//router.get('/:id', controller.productItem);

//router changeActive, ":" dùng để chuyển data động
router.patch('/changeStatus/:status/:id', controller.changeStatus);

//router changeAll, 
router.patch('/change-multi', controller.changeMulti);

//Delete item
router.delete('/delete/:id', controller.deleteItem);

//router create
router.get('/create', controller.create);

//router createItem
router.post('/create',
    upload.single('thumbnail'),
    uploadCloud.uploadonline,
    validateProduct.createItem,
    controller.createItem
);

//router edit
router.get('/edit/:id', controller.edit);

//router edit
router.patch('/edit/:id',
    upload.single('thumbnail'),
    validateProduct.createItem,
    controller.editItem
);

//router detail
router.get('/detail/:id', controller.detail);

module.exports = router; 