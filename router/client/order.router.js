const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/order.controller");


router.get("/", controller.index);

router.post("/order", controller.order);

router.get("/success/:idOrder", controller.success);


module.exports = router;