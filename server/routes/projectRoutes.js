import express from "express";
import Project from "../models/Project.js";
import crypto from "crypto";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { hostName } = req.body;

  const projectId = crypto.randomBytes(4).toString("hex");

  const project = await Project.create({
    projectId,
    hostName,
    files: [
      {
        filename: "index.js",
        language: "javascript",
        content: "",
      },
    ],
  });

  res.json(project);
});

router.post("/join", async (req, res) => {
  const { projectId } = req.body;

  const project = await Project.findOne({ projectId });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});

export default router;
