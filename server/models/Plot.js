const mongoose = require("mongoose");

const plotSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    description: "User related to this plot",
  },
  name: {
    type: String,
    required: true,
    description: "Name or identifier for the plot",
  },
  processed: {
    type: Boolean,
    required: true,
    default: false,
  },
  number_of_oranges: {
    type: Number,
    required: true,
    description: "Total number of oranges detected in the plot",
  },
  detected_trees: {
    type: Number,
    required: true,
    description: "Number of trees detected in the plot",
  },
  undetected_trees: {
    type: Number,
    required: true,
    description: "Number of trees not detected in the plot",
  },
  estimated_yield: {
    type: Number,
    required: true,
    description: "Estimated yield in terms of oranges per plot",
  },
  trees_number: {
    type: Number,
    required: true,
    description: "Total number of trees in the plot",
  },
  oranges_per_tree: {
    type: Number,
    required: true,
    description: "Average number of oranges per tree",
  },
  location: {
    type: String,
    required: true,
    description: "Geographical location of the plot",
  },
  date: {
    type: Date,
    required: true,
    description: "Date of the plot data collection",
  },
  crop_type: {
    type: String,
    required: true,
    description: "Type of crop on the plot, e.g., Oranges",
  },
  av_tree_age: {
    type: Number,
    required: true,
    description: "Average age of trees on the plot in years",
  },
  imageBounds: {
    type: [[Number]],
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 2 && v.every((coord) => coord.length === 2);
      },
      message: "imageBounds must contain two coordinate pairs",
    },
    description: "Geographical boundaries of the plot",
  },
  imagesSources: {
    basic: {
      type: String,
      required: true,
      description: "Path to the basic map image",
    },
    bw: {
      type: String,
      required: true,
      description: "Path to the black-and-white map image",
    },
  },
});

// Compile model from schema
const Plot = mongoose.model("Plot", plotSchema);

module.exports = Plot;
