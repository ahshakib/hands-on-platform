import Team from "../models/Team.js";
import User from "../models/User.js";

// ✅ Create a new team
const createTeam = async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required" });
    }

    const team = new Team({
      name,
      description,
      isPrivate,
      createdBy: req.user.id,
      members: [req.user.id], // Creator is the first member
    });

    await team.save();
    res.status(201).json({ message: "Team created successfully", team });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all public teams
const getPublicTeams = async (req, res) => {
  try {
    const teams = await Team.find({ isPrivate: false }).populate("createdBy", "name email");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get a single team's details
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("members", "name email");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Join a public team
const joinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.isPrivate) {
      return res.status(403).json({ message: "This is a private team, invite required" });
    }

    if (team.members.includes(req.user.id)) {
      return res.status(400).json({ message: "You are already a member of this team" });
    }

    team.members.push(req.user.id);
    await team.save();
    res.json({ message: "Joined team successfully", team });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Leave a team
const leaveTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (!team.members.includes(req.user.id)) {
      return res.status(400).json({ message: "You are not a member of this team" });
    }

    team.members = team.members.filter(member => member.toString() !== req.user.id);
    await team.save();
    res.json({ message: "Left the team successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createTeam, getPublicTeams, getTeamById, joinTeam, leaveTeam };
