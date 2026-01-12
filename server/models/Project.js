import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileId: { type: String, required: true },
    filename: { type: String, required: true },
    language: { type: String, required: true },
    content: { type: String, default: "" },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    projectId: { type: String, unique: true, required: true },
    hostName: { type: String, required: true },

    // 🔑 multi-file workspace (primary editor state)
    files: {
      type: [fileSchema],
      default: [
        {
          fileId: "main",
          filename: "index.js",
          language: "javascript",
          content: "",
        },
      ],
    },

    // tracks which file is currently open
    activeFileId: {
      type: String,
      default: "main",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
