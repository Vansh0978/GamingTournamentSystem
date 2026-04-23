const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  members: [String], // user IDs or emails
  createdBy: String
});

module.exports = mongoose.model("Team", teamSchema);