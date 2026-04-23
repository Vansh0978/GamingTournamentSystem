const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: String,
  game: String,
  date: String,
  prize: String,
  image: String,
  createdBy: String,

  // 🔥 NEW FIELD: teams joined
  teams: [
    {
      teamId: String,
      teamName: String,
      joinedAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Tournament", tournamentSchema);