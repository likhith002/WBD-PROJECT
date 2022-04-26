const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");

const bodyparser = require("body-parser");
dotenv.config({ path: "config.env" });
const cors = require("cors");
const rotatefilestream = require("rotating-file-stream");
const connectDB = require("./server/database/connection");
const port = process.env.PORT;
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
// middlewares
//log the requests

app.use(cors());

// app.use(morgan("tiny"))

// parse the request

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.json());
const access = rotatefilestream.createStream("logfile.log", {
  interval: "1m",
  path: path.join(__dirname, "logs"),
});
app.use(morgan("combined", { stream: access }));

app.use("/", require("./server/routes/order_route"));
app.use("/", require("./server/routes/reviews_route"));
app.use("/", require("./server/routes/user_routes"));
app.use("/", require("./server/routes/product_routes"));
app.use("/", require("./server/routes/price_history_routes"));
app.use("/", require("./server/routes/offer_routes"));

app.use('/images', express.static('images'));

app.post("/avatar", upload.single("avatar"), async (req, res) => {

  console.log(req.body)
  console.log('dasd');
  console.log(req.query)
  
  let params = SeperateNonAttribParams(UserModel, req.body);
  if(req.file){
    let tt = await UserModel.findOneAndUpdate(params, {$set: {avatar: `localhost:${port}/images/${req.file.filename}`}})
    res.status(200).json(tt);
  }
})


// connecting to mongo Atlas  server
connectDB();

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
