// Import necessary modules
import React, { useRef, useEffect } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";

// CSS styles

interface EditorProps {
  initialData?: OutputData; // Optional initial data in JSON format
}

// Define the Editor component
const Editor: React.FC<EditorProps> = ({ initialData }) => {
  // Create a ref to hold the EditorJS instance
  const editorRef = useRef<EditorJS | null>(null);

  // Function to handle saving the editor content
  const handleSave = async () => {
    if (editorRef.current) {
      const outputData: OutputData = await editorRef.current.save();
      console.log("Editor Content:", outputData);
    }
  };

  // Initialize the editor when the component mounts
  useEffect(() => {
    // Initialize EditorJS
    editorRef.current = new EditorJS({
      holder: "editor-container", // Specify the container element by its id
      autofocus: true, // Autofocus on the editor when it loads
      tools: {}, // Add your custom tools here
      data: initialData, // Pass the initial data to the editor
    });

    // Cleanup function to destroy the editor when the component unmounts
    return () => {
    //   if (editorRef.current) {
    //     editorRef.current?.destroy();
    //   }
    };
  }, [initialData]);

  return (
    <div className="editor-container">
      <div id="editor-container" style={{ minHeight: "300px" }}></div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Editor;
