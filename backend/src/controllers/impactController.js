import { logVolunteerHours, verifyHours, getUserPoints, getLeaderboard } from '../services/impactService.js';

export const logHours = async (req, res) => {
  try {
    const { eventId, hours } = req.body;
    const impact = await logVolunteerHours(req.user.id, eventId, hours);
    res.status(201).json({ message: "Logged successfully", impact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyVolunteerHours = async (req, res) => {
  try {
    const { logId } = req.body;
    const impact = await verifyHours(logId, req.user.id);
    res.status(200).json({ message: "Hours verified", impact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchUserPoints = async (req, res) => {
  try {
    const { totalHours, points, certificate } = await getUserPoints(req.user.id);
    res.status(200).json({ userId: req.user.id, totalHours, totalPoints: points, certificate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchLeaderboard = async (req, res) => {
  try {
    const leaderboard = await getLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
