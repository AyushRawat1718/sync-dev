import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import Host from "./pages/Host";
import Guest from "./pages/Guest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/join" element={<RoleSelect />} />
        <Route path="/host" element={<Host />} />
        <Route path="/guest" element={<Guest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
