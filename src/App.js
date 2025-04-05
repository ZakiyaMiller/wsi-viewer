import React, { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel"; // Findings/Summary panel
import ImageViewer from "./components/ImageViewer"; // Main whole slide image viewer
import ReportButton from "./components/ReportButton";
import "./styles.css";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [boxesVisible, setBoxesVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBack = () => window.history.back();

  const toggleBoxes = () => {
    const overlay = document.getElementById('detection-overlay');
    if (overlay) {
      const isVisible = overlay.style.display !== 'none';
      overlay.style.display = isVisible ? 'none' : 'block';
      setBoxesVisible(!isVisible);
    }
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="date-time">{currentTime.toLocaleString()}</div>
      </header>
      <div className="content" style={{ padding: '15px' }}>
        <LeftPanel />
        <ImageViewer />
      </div>
      <div className="action-buttons">
        <button 
          className="toggle-boxes-btn"
          onClick={toggleBoxes}
        >
          {boxesVisible ? 'Hide Boxes' : 'Show Boxes'}
        </button>
        <ReportButton />
      </div>
    </div>
  );
}

export default App;
