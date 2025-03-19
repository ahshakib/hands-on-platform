import express from "express";
import {
  createTeam,
  getPublicTeams,
  getTeamById,
  joinTeam,
  leaveTeam
} from "../controllers/teamController.js";
import protect from "../middlewares/authMiddleware.js";
import validateTeam from "../validators/teamValidator.js";

const router = express.Router();

router.post("/", protect, validateTeam, createTeam);
router.get("/", getPublicTeams);
router.get("/:id", getTeamById);
router.post("/:id/join", protect, joinTeam);
router.post("/:id/leave", protect, leaveTeam);

export default router;
