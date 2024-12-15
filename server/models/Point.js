const mongoose = require("mongoose");

const PointSchema = new mongoose.Schema({
  plotId: { type: mongoose.Schema.Types.ObjectId, ref: "Plot", required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  numberOfOranges: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Point", PointSchema);
