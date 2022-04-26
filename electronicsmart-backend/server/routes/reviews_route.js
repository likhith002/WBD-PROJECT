const express = require("express");
const app = express();
const route = express.Router();
const controller = require("../controller/review_controller");
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

route.post("/reviews", controller.createReview);
route.get("/reviews", controller.find);
//route.get("/orders", controller.getAll);
module.exports = route;
