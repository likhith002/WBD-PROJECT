const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      min: 100,
      required: true,
    },

    products: [],

    address: [],

    payment: [
      {
        type: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        no: {
          type: Number,

          minlength: 12,
          maxlength: 12,
          required: true,
        },
        exp: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const order_db = mongoose.model("order", schema);

module.exports = order_db;
