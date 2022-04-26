const express = require("express");
const route = express.Router();
const controller = require("../controller/order_controller");

route.post("/orders", controller.createOrder);
route.get("/orders", controller.find);
// route.get("/orders", controller.getAll);
module.exports = route;
