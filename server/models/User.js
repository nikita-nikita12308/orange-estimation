const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: "Full name of the user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    description: "Email address of the user",
  },
  password: {
    type: String,
    required: true,
    description: "Password for user authentication",
  },
});

module.exports = mongoose.model("User", UserSchema);
