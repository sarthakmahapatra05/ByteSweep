import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import DiskSpaceAnalyzer from "./components/DiskSpaceAnalyzer";
import FileOrganizer from "./components/FileOrganizer";
import FileCompressor from "./components/FileCompressor";
import QuickStart from "./components/QuickStart";
import Installation from "./components/Installation";
import Setup from "./components/Setup";
import { AuthProvider } from "./components/AuthContext";

function NotFound() {
  return <div style={{ padding: 40, fontSize: 32 }}>404 - Page Not Found</div>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyze" element={<DiskSpaceAnalyzer />} />
          <Route path="/organize" element={<FileOrganizer />} />
          <Route path="/compress" element={<FileCompressor />} />
          <Route path="/quick-start" element={<QuickStart />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App; 