const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    timeDeparture: {
      type: String,
      required: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);