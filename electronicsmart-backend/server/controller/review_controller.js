const review_db = require("../model/review_model");

const createReview = (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Review data  cannot be empty" });
    return;
  } else {
    const review = new review_db({ ...req.body });
    review
      .save()
      .then((data) => res.status(200).json(data))
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};

const find = (req, res) => {
  if (req.query.id) {
    const p_id = req.query.id;
    review_db
      .find({ product_id: p_id })
      .sort({ createdAt: "desc" })
      .then((data) => {
        if (!data)
          res.status(404).json({ message: "No Reviews with this product id" });
        else {
          res.json(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error while retriving data" || err.message });
      });
  } else {
    res
      .status(500)
      .json({ message: "Error while retriving data No parameter passed" });
  }
};

exports.createReview = createReview;
exports.find = find;
