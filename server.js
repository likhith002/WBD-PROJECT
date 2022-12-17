const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const multer = require("multer");
const bodyparser = require("body-parser");
dotenv.config({ path: "config.env" });
const cors = require("cors");
const rotatefilestream = require("rotating-file-stream");
const connectDB = require("./electronicsmart-backend/server/database/connection");
const port = process.env.PORT || 3002;
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const UserModel = require("./electronicsmart-backend/server/model/user_model");
const {
  SeperateNonAttribParams,
} = require("./electronicsmart-backend/server/util/paramhelper");
const crypto = require("crypto");

// middlewares
//log the requests

app.use(cors());

// app.use(morgan("tiny"));

// parse the request

// app.use("/images", express.static("images"));
// app.use('/', express.static(path.join(__dirname, "../electronicsmart-app/build")));

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/electronicsmart-app/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname1, "electronicsmart-app", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// app.use(express.json());
// const access = rotatefilestream.createStream("logfile.log", {
//   interval: "10m",
//   path: path.join(__dirname, "logs"),
// });

// app.use("/", require("./electronicsmart-backend/server/routes/order_route"));
// app.use("/", require("./electronicsmart-backend/server/routes/reviews_route"));
// app.use("/", require("./electronicsmart-backend/server/routes/user_routes"));
// app.use("/", require("./electronicsmart-backend/server/routes/product_routes"));
// app.use(
//   "/",
//   require("./electronicsmart-backend/server/routes/price_history_routes")
// );
// app.use("/", require("./electronicsmart-backend/server/routes/offer_routes"));
// app.use(morgan("combined", { stream: access }));
// // connecting to mongo Atlas  server
// connectDB();

// const store = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, crypto.randomUUID() + file.originalname);
//   },
// });

// const upload = multer({ storage: store });

// app.post("/avatar", upload.single("avatar"), async (req, res) => {
//   console.log(req.body);
//   console.log("dasd");
//   console.log(req.query);

//   let params = SeperateNonAttribParams(UserModel, req.body);
//   if (req.file) {
//     let tt = await UserModel.findOneAndUpdate(params, {
//       $set: { avatar: `localhost:${port}/images/${req.file.filename}` },
//     });
//     res.status(200).json(tt);
//   }
// });

// app.get("product/*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../electronicsmart-app/build", "index.html")
//   );
// });

// app.listen(port, () => {
//   console.log(`server is running at http://localhost:${port}`);
// });
