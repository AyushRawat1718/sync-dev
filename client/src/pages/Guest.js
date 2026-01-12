import { useState } from "react";

function Guest() {
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");

  return (
    <div style={{ padding: 40 }}>
      <h2>Join as Guest</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />

      <button>Join Project</button>
    </div>
  );
}

export default Guest;
