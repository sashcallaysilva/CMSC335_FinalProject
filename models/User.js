const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  phone: { type: String, required: true },
  collegeStatus: { type: String, required: true },
  coursesSelected: [{ type: String }],
  userInformation: { type: String },
  createdAt: { type: Date, default: Date.now },
}, { collection: "profiles" });

// Create and export the model
module.exports = mongoose.model("User", userSchema);