import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h1>sync-dev</h1>
      <p>Real-time collaborative coding with AI assistance</p>

      <button onClick={() => navigate("/join")}>Get Started</button>
    </div>
  );
}

export default Landing;
