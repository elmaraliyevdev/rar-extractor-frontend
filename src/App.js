import React from "react";
import RarExtractor from "./RarExtractor";

import "./App.css";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-96 bg-white shadow-md p-8 rounded-md">
        <h1 className="text-xl font-bold mb-6">File Upload</h1>
        <RarExtractor />
      </div>
    </div>
  );
}

export default App;
