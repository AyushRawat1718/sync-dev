import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import Host from "./pages/Host";
import Guest from "./pages/Guest";
import CodeEditor from "./pages/Editor";

import socket from "./services/socket";

function App() {
  useEffect(() => {
    socket.on("user-joined", ({ userName }) => {
      console.log(`${userName} joined the project`);
    });

    return () => {
      socket.off("user-joined");
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/join" element={<RoleSelect />} />
        <Route path="/host" element={<Host />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/editor" element={<CodeEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
