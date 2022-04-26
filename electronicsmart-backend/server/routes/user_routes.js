const UserModel = require("../model/user_model");
const express = require("express");
const {
  SeperateNonAttribParams,
  SeperateAttribParams,
} = require("../util/paramhelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const route = express.Router();

route.use(express.json());

route.post("/user", async (req, res) => {
  try {
    if (req.query.checkemail) {
      let status = await UserModel.find({ email: req.body.email });
      if (!status.length) {
        res.json({ available: true });
      } else {
        res.json({ available: false });
      }
      return;
    }
    let user = new UserModel(req.body);
    let status = await user.save(); // use create method

    if (status) {
      delete status["password"];
      res.status(201).json(status);
    }
  } catch (Err) {
    res.status(500).json({ error: `Internal Server Failure! ${Err}` });
  }
});

route.get("/user", verifytoken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.status(404).json({ error: "No user Found!" });
    } else {
      try {
        let params = SeperateNonAttribParams(UserModel, req.query);
        // check perms!

        if (params.getall) {
          let tt = await UserModel.find({ ...req.query }, "-password");
          res.status(200).json(tt);
          return;
        }

        let query = UserModel.findOne({ ...req.query }, "-password -__v");

        if (params.onlyaddress) {
          query = UserModel.findOne({ ...req.query }, "Address -_id");
        }
        let details = await query;
        if (details) {
          res.json(details);
        } else {
          res.status(404).json({ error: "No user Found!" });
        }
      } catch (error) {
        res.status(500).json({ error: `Internal Server Error {error}` });
      }
    }
  });
});

route.post("/login", async (req, res) => {
  if (!req.body.email) {
    res.json({ error: "email can't be empty!" });
    return;
  }
  let result = await UserModel.findOne({
    email: req.body.email,
  });

  if (!result) {
    res
      .status(404)
      .json({ error: "Username and Password combination not found!" });
    return;
  }

  bcrypt.compare(req.body.password, result.password, (err, isMatch) => {
    if (isMatch) {
      jwt.sign(
        { user: result },
        "secretkey",
        { expiresIn: "86400s" },
        (err, token) => {
          result.token = token;
          console.log(result);
        }
      );
      res.status("200").json(result);
    } else
      res
        .status(404)
        .json({ error: "Username and Password combination not found!" });
  });
});

// format of token
// authorization : Bearer <access_token>

// verify token
function verifytoken(req, res, next) {
  //get auth header
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // FORBIDDEN
    res.sendStatus(403);
  }
}

route.patch("/user", verifytoken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.status(404).json({ error: "No user Found!" });
    } else {
      if (Object.keys(req.query).length === 0) {
        res.status("400").json({ error: "Invalid params!" });
        return;
      }

      let params = SeperateNonAttribParams(UserModel, req.query);
      if (params.addaddress) {
        // console.log(req.body.Address)

        if (!req.body.Address) {
          res.status(400).json({ error: "Address missing in body!" });
          return;
        }
        obj = await UserModel.findOneAndUpdate(
          req.query,
          { $push: { Address: req.body.Address } },
          { new: true }
        );
        res.status("200").json(obj);
        return;
      } else if (params.address) {
        if (!req.body.Address) {
          res.status(400).json({ error: "Address missing in body!" });
          return;
        }
        let obj = await Product.findOneAndUpdate(
          req.query,
          { $pull: { Address: req.body.Address } },
          { new: true }
        );
        res.status("200").json(obj);
        return;
      }
      let updates = SeperateAttribParams(UserModel, req.body);

      let updatedObject = await UserModel.findOneAndUpdate(
        req.query,
        { $set: updates },
        { new: true }
      );
      if (updatedObject) {
        res.status("200").json(updatedObject);
      } else {
        res.status("500").json({ error: "Failed to update object!" });
      }
    }
  });
});

module.exports = route;
