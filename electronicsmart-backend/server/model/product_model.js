const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ram: {
      type: Number,
      // required: true,
      default: null,
    },
    memory: {
      type: Number,
      // required: true,
      default: null,
    },
    networkconnectivity: {
      type: String,
      // required: true,
      default: null,
    },
    pin: [
      {
        type: Number,
        default: null,
      },
    ],
    resolution: {
      type: String,
      default: null,
    },
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    warranty: {
      type: Number,
      default: null,
    },
    hdmi: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

ProductSchema.index({name: 'text', 'name':'text'});

module.exports = mongoose.model("products", ProductSchema);
