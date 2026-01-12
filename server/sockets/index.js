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

    socket.on("join-project", async ({ projectId, userName }) => {
      socket.join(projectId);

      const project = await Project.findOne({ projectId });

      if (project) {
        socket.emit("code-update", {
          code: project.code,
        });
      }

      socket.to(projectId).emit("user-joined", {
        userName,
      });
    });

    socket.on("code-change", async ({ projectId, code }) => {
      await Project.findOneAndUpdate({ projectId }, { code }, { new: true });

      io.to(projectId).emit("code-update", {
        code,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default setupSocket;
