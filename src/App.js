import React, { useState, useEffect, createContext } from "react";
import LeftPanel from "./components/LeftPanel"; // Findings/Summary panel
import ImageViewer from "./components/ImageViewer"; // Main whole slide image viewer
import ReportButton from "./components/ReportButton";
import "./styles.css";

export const ThemeContext = createContext();

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [boxesVisible, setBoxesVisible] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <header className="top-bar">
          <div className="date-time">{currentTime.toLocaleString()}</div>
        </header>
        <div className="content" style={{ padding: '15px' }}>
          <LeftPanel />
          <ImageViewer isLocked={isLocked} />
        </div>
        <button 
          className="theme-toggle-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <div className="action-buttons">
          <button 
            className={`lock-view-btn ${isLocked ? 'locked' : ''}`}
            onClick={toggleLock}
          >
            {isLocked ? 'Unlock View' : 'Lock View'}
          </button>
          <button 
            className="toggle-boxes-btn"
            onClick={toggleBoxes}
          >
            {boxesVisible ? 'Hide Boxes' : 'Show Boxes'}
          </button>
          <ReportButton />
        </div>
        <div className="copyright">
          © 2025 WSI Viewer by Zakiya. All rights reserved.
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
