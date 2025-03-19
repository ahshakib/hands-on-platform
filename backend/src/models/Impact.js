import mongoose from 'mongoose';

const impactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  hours: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'verified'], default: 'pending' },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const Impact = mongoose.model('Impact', impactSchema);
export default Impact;
