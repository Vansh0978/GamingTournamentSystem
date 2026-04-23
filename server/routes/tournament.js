const express = require("express");
const router = express.Router();

const Tournament = require("../models/Tournament");
const Team = require("../models/Team");


// ✅ CREATE TOURNAMENT
router.post("/create", async (req, res) => {
  try {
    const tournament = new Tournament({
      ...req.body,
      teams: [] // initialize teams array
    });

    await tournament.save();

    res.json({ message: "Tournament created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating tournament" });
  }
});


// ✅ GET ALL TOURNAMENTS (IMPORTANT FIX)
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    console.error(err);
    res.json([]);
  }
});


// ✅ JOIN TOURNAMENT WITH TEAM
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


// ✅ DELETE TOURNAMENT
router.delete("/delete/:id", async (req, res) => {
  try {
    await Tournament.findByIdAndDelete(req.params.id);
    res.json({ message: "Tournament deleted" });
  } catch (err) {
    console.error(err);
    res.json({ message: "Error deleting tournament" });
  }
});


module.exports = router;