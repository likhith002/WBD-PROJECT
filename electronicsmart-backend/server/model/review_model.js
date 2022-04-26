const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    product_id: {
      type: String,
      required: true,
    },

    data: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const review_db = mongoose.model("review", schema);

module.exports = review_db;
