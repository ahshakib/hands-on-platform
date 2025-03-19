import express from 'express';
import { logHours, verifyVolunteerHours, fetchUserPoints, fetchLeaderboard } from '../controllers/impactController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/log-hours', protect, logHours);
router.post('/verify-hours', protect, verifyVolunteerHours);
router.get('/points', protect, fetchUserPoints);
router.get('/leaderboard', fetchLeaderboard);

export default router;
