import mongoose from "mongoose";

const helpRequestSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    urgency: { type: String, enum: ["low", "medium", "urgent"], required: true },
    location: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const HelpRequest = mongoose.model("HelpRequest", helpRequestSchema);

export default HelpRequest;
