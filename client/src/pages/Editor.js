import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import socket, { getProjectId } from "../services/socket";

function CodeEditor() {
  const [code, setCode] = useState("");
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    socket.on("code-update", ({ code }) => {
      isRemoteUpdate.current = true;
      setCode(code);
    });

    return () => {
      socket.off("code-update");
    };
  }, []);

  const handleChange = (value) => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    setCode(value);

    const projectId = getProjectId();
    if (!projectId) return;

    socket.emit("code-change", {
      projectId,
      code: value,
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <Editor
        height="100%"
        language="javascript"
        value={code}
        onChange={handleChange}
        theme="vs-dark"
      />
    </div>
  );
}

export default CodeEditor;
