import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isPrivate: { type: Boolean, default: false }, // True = Private, False = Public
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Team members
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
