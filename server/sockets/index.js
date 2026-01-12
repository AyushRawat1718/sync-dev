import { Server } from "socket.io";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-project", ({ projectId, userName }) => {
      socket.join(projectId);

      socket.to(projectId).emit("user-joined", {
        userName,
      });
    });

    socket.on("code-change", ({ projectId, code }) => {
      socket.to(projectId).emit("code-update", {
        code,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default setupSocket;
