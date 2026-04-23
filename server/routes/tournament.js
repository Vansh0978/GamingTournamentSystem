const express = require("express");
const router = express.Router(); // ✅ REQUIRED

const Tournament = require("../models/Tournament"); // ✅ REQUIRED
const Team = require("../models/Team");

// 🔥 JOIN TOURNAMENT WITH TEAM
router.post("/join", async (req, res) => {
  try {
    const { tournamentId, teamCode } = req.body;

    // find tournament
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.json({ message: "Tournament not found" });
    }

    // ensure teams array exists
    if (!tournament.teams) {
      tournament.teams = [];
    }

    // find team
    const team = await Team.findOne({ code: teamCode });
    if (!team) {
      return res.json({ message: "Invalid team code" });
    }

    // check if already joined
    const alreadyJoined = tournament.teams.some(
      (t) => t.teamId?.toString() === team._id.toString()
    );

    if (alreadyJoined) {
      return res.json({ message: "Team already joined" });
    }

    // add team
    tournament.teams.push({
      teamId: team._id,
      teamName: team.name
    });

    await tournament.save();

    res.json({ message: "Team joined tournament" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error joining tournament" });
  }
});

module.exports = router; // ✅ REQUIRED