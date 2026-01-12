import { useState } from "react";
import socket from "../services/socket";

function Guest() {
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");

  const joinProject = async () => {
    const res = await fetch("http://localhost:5000/api/projects/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });

    if (!res.ok) {
      alert("Project not found");
      return;
    }

    socket.emit("join-project", {
      projectId,
      userName: name,
    });

    alert("Joined project successfully");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Join as Guest</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />

      <br />
      <br />

      <button onClick={joinProject}>Join Project</button>
    </div>
  );
}

export default Guest;
