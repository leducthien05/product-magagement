const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/cart.controller");

router.post("/add/:id", controller.addProduct);

router.get("/", controller.index);

router.get("/delete/:idProduct", controller.delete);

router.get("/update/:idProduct/:quantity", controller.updateQuantity);

module.exports = router;