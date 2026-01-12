import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectId: { type: String, unique: true, required: true },
    hostName: { type: String, required: true },
    files: [
      {
        filename: String,
        content: String,
        language: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
