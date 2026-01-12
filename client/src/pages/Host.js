import { useState } from "react";

function Host() {
  const [projectId, setProjectId] = useState("");

  return (
    <div style={{ padding: 40 }}>
      <h2>Host a Project</h2>

      <button>Create New Project</button>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Enter existing Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
        <button>Resume Project</button>
      </div>
    </div>
  );
}

export default Host;
