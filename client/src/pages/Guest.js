import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setProjectId } from "../services/socket";

function Guest() {
  const [projectId, setProjectIdInput] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const joinProject = async () => {
    setError("");

    if (!name || !projectId) {
      setError("Please enter both name and project ID");
      return;
    }

    const res = await fetch("http://localhost:5000/api/projects/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    });

    if (!res.ok) {
      setError("Project not found. Please check the Project ID.");
      return;
    }

    // ✅ Only responsibility: store project context
    setProjectId(projectId);

    // ❌ DO NOT join socket room here
    // Editor will handle that

    navigate("/editor");
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
        onChange={(e) => setProjectIdInput(e.target.value)}
      />

      <br />
      <br />

      <button onClick={joinProject}>Join Project</button>

      {error && <p style={{ color: "red", marginTop: 20 }}>{error}</p>}
    </div>
  );
}

export default Guest;
