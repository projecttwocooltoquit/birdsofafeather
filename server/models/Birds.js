const { Schema, model } = require("mongoose");

const birdsSchema = new Schema({
  sciName: {
    type: String,
    required: true,
    trim: true,
  },
  comName: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
});

const Birds = model("Birds", birdsSchema);

module.exports = Birds;
