import { useState } from "react";
import socket from "../services/socket";

function Host() {
  const [projectId, setProjectId] = useState("");
  const [hostName, setHostName] = useState("");

  const createProject = async () => {
    const res = await fetch("http://localhost:5000/api/projects/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostName }),
    });

    const data = await res.json();

    socket.emit("join-project", {
      projectId: data.projectId,
      userName: hostName,
    });

    alert(`Project created. Project ID: ${data.projectId}`);
  };

  const resumeProject = async () => {
    const res = await fetch("http://localhost:5000/api/projects/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });

    const data = await res.json();

    socket.emit("join-project", {
      projectId: data.projectId,
      userName: hostName,
    });

    alert(`Resumed project ${data.projectId}`);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Host a Project</h2>

      <input
        placeholder="Your Name"
        value={hostName}
        onChange={(e) => setHostName(e.target.value)}
      />

      <br />
      <br />

      <button onClick={createProject}>Create New Project</button>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Existing Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <button onClick={resumeProject}>Resume Project</button>
      </div>
    </div>
  );
}

export default Host;
