import Editor from "@monaco-editor/react";
import { useState } from "react";

function CodeEditor() {
  const [code, setCode] = useState("");

  return (
    <div style={{ height: "100vh" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Start coding..."
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
      />
    </div>
  );
}

export default CodeEditor;
