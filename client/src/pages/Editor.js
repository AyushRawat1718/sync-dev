import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import socket, { getProjectId } from "../services/socket";

const getLanguageFromFilename = (filename) => {
  const ext = filename.split(".").pop();
  const map = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    java: "java",
    cpp: "cpp",
    c: "c",
    html: "html",
    css: "css",
    json: "json",
  };
  return map[ext] || "plaintext";
};

function CodeEditor() {
  const [files, setFiles] = useState([]);
  const [activeFileId, setActiveFileId] = useState(null);
  const isRemoteUpdate = useRef(false);

  const activeFile = files.find((f) => f.fileId === activeFileId);

  useEffect(() => {
    const projectId = getProjectId();
    if (projectId) {
      socket.emit("join-project", {
        projectId,
        userName: "Reconnected User",
      });
    }

    const handleProjectState = ({ files, activeFileId }) => {
      setFiles(files);
      setActiveFileId(activeFileId);
    };

    const handleFileUpdate = ({ fileId, content }) => {
      isRemoteUpdate.current = true;
      setFiles((prev) =>
        prev.map((f) => (f.fileId === fileId ? { ...f, content } : f))
      );
    };

    const handleFileSelected = ({ fileId }) => {
      setActiveFileId(fileId);
    };

    const handleFileCreated = ({ file }) => {
      setFiles((prev) => [...prev, file]);
      setActiveFileId(file.fileId);
    };

    socket.on("project-state", handleProjectState);
    socket.on("file-update", handleFileUpdate);
    socket.on("file-selected", handleFileSelected);
    socket.on("file-created", handleFileCreated);

    return () => {
      socket.off("project-state", handleProjectState);
      socket.off("file-update", handleFileUpdate);
      socket.off("file-selected", handleFileSelected);
      socket.off("file-created", handleFileCreated);
    };
  }, []);

  const handleEditorChange = (value) => {
    if (!activeFile) return;

    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }

    setFiles((prev) =>
      prev.map((f) =>
        f.fileId === activeFile.fileId ? { ...f, content: value } : f
      )
    );

    const projectId = getProjectId();
    if (!projectId) return;

    socket.emit("file-change", {
      projectId,
      fileId: activeFile.fileId,
      content: value,
    });
  };

  const createNewFile = () => {
    const filename = prompt("Enter file name (e.g. utils.js)");
    if (!filename) return;

    const projectId = getProjectId();
    if (!projectId) return;

    const file = {
      fileId: Date.now().toString(),
      filename,
      language: getLanguageFromFilename(filename),
      content: "",
    };

    socket.emit("file-create", {
      projectId,
      file,
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* FILE EXPLORER */}
      <div
        style={{
          width: 240,
          background: "#1e1e1e",
          color: "#fff",
          padding: 10,
        }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}>
          <h4 style={{ margin: 0 }}>Files</h4>
          <button onClick={createNewFile}>＋</button>
        </div>

        {files.map((file) => (
          <div
            key={file.fileId}
            style={{
              padding: "6px 8px",
              cursor: "pointer",
              background: file.fileId === activeFileId ? "#333" : "transparent",
            }}
            onClick={() => {
              setActiveFileId(file.fileId);
              const projectId = getProjectId();
              if (projectId) {
                socket.emit("file-select", {
                  projectId,
                  fileId: file.fileId,
                });
              }
            }}>
            {file.filename}
          </div>
        ))}
      </div>

      {/* CODE EDITOR */}
      <div style={{ flex: 1 }}>
        {activeFile && (
          <Editor
            height="100%"
            language={activeFile.language}
            value={activeFile.content}
            onChange={handleEditorChange}
            theme="vs-dark"
          />
        )}
      </div>
    </div>
  );
}

export default CodeEditor;
