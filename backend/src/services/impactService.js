import Impact from '../models/Impact.js';
import { generateCertificate } from '../utils/certificateGenerator.js';
import User from '../models/User.js';
import path from 'path';

const MILESTONES = [20, 50, 100];

export const logVolunteerHours = async (userId, eventId, hours) => {
  return await Impact.create({
    user: userId,
    event: eventId,
    hours,
    status: 'pending',
  });
};

export const verifyHours = async (logId, verifierId) => {
  const impact = await Impact.findById(logId);
  if (!impact) throw new Error('Impact log not found');

  impact.status = 'verified';
  impact.verifiedBy = verifierId;
  await impact.save();

  return impact;
};

export const getUserPoints = async (userId) => {
  const impacts = await Impact.find({ user: userId, status: 'verified' });
  const totalHours = impacts.reduce((acc, impact) => acc + impact.hours, 0);
  const points = totalHours * 5;

  // Check if user has reached a milestone
  if (MILESTONES.includes(totalHours)) {
    const user = await User.findById(userId);
    const certificatePath = await generateCertificate(user, totalHours);

    return { totalHours, points, certificate: path.basename(certificatePath) };
  }

  return { totalHours, points, certificate: null };
};

export const getLeaderboard = async () => {
  return await Impact.aggregate([
    { $match: { status: 'verified' } },
    { $group: { _id: '$user', totalHours: { $sum: '$hours' } } },
    { $sort: { totalHours: -1 } },
    { $limit: 10 },
  ]);
};
