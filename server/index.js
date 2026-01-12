import express from "express";
import cors from "cors";
import http from "http";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.get("/health", (req, res) => {
  res.json({ status: "ok", app: "sync-dev" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`sync-dev server running on ${PORT}`);
});
