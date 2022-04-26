const order_db = require("../model/order_model");
exports.createOrder = (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Order details cannot be empty" });
    return;
  } else {
    const order = new order_db({ ...req.body });
    order
      .save(order)
      .then((data) => res.status(200).json(data))
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
};

exports.find = async (req, res) => {
  if (req.query.id) {
    const u_id = req.query.id;
    order_db
      .find({ user_id: u_id }, "total timestamp products address")
      .sort({ timestamp: -1 })
      .then((data) => {
        if (!data) {
          console.log(data);
          res.status(404).json({ message: "No orders with this user id" });
        } else {
          res.json(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error while retriving data" || err.message });
      });
  } else if (req.query.getall) {
    res.json(await order_db.find());
  } else {
    res
      .status(500)
      .json({ message: "Error while retriving data No parameter passed" });
  }
};
