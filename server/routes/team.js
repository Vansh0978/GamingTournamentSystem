const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// 🔥 CREATE TEAM
router.post("/create", async (req, res) => {
  try {
    const { name, createdBy } = req.body;

    const code = Math.random().toString(36).substring(2, 8);

    const team = new Team({
      name,
      code,
      members: [createdBy],
      createdBy
    });

    await team.save();

    res.json({ message: "Team created", team });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating team" });
  }
});

// 🔥 JOIN TEAM
router.post("/join", async (req, res) => {
  try {
    const { code, user } = req.body;

    const team = await Team.findOne({ code });

    if (!team) {
      return res.json({ message: "Team not found" });
    }

    if (!team.members.includes(user)) {
      team.members.push(user);
    }

    await team.save();

    res.json({ message: "Joined team", team });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error joining team" });
  }
});

// 🔥 GET ALL TEAMS
router.get("/", async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

module.exports = router;