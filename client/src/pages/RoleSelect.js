import { useNavigate } from "react-router-dom";

function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h2>Join sync-dev</h2>

      <button onClick={() => navigate("/host")}>Continue as Host</button>

      <button onClick={() => navigate("/guest")}>Continue as Guest</button>
    </div>
  );
}

export default RoleSelect;
