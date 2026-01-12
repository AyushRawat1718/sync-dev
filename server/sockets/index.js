import { Server } from "socket.io";
import Project from "../models/Project.js";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // JOIN PROJECT
    socket.on("join-project", async ({ projectId, userName }) => {
      socket.join(projectId);

      const project = await Project.findOne({ projectId });

      if (project) {
        socket.emit("project-state", {
          files: project.files,
          activeFileId: project.activeFileId,
        });
      }

      socket.to(projectId).emit("user-joined", { userName });
    });

    // FILE CONTENT CHANGE
    socket.on("file-change", async ({ projectId, fileId, content }) => {
      const project = await Project.findOne({ projectId });
      if (!project) return;

      const file = project.files.find((f) => f.fileId === fileId);
      if (!file) return;

      file.content = content;
      await project.save();

      io.to(projectId).emit("file-update", {
        fileId,
        content,
      });
    });

    // ACTIVE FILE SWITCH
    socket.on("file-select", async ({ projectId, fileId }) => {
      await Project.findOneAndUpdate({ projectId }, { activeFileId: fileId });

      io.to(projectId).emit("file-selected", {
        fileId,
      });
    });

    // CREATE NEW FILE
    socket.on("file-create", async ({ projectId, file }) => {
      await Project.findOneAndUpdate({ projectId }, { $push: { files: file } });

      io.to(projectId).emit("file-created", {
        file,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default setupSocket;
