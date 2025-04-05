import React from "react";

const RightPanel = () => {
  return (
    <div className="right-panel" style={{ width: "250px" }}>
      {/* Removed mini hub display */}
      <div className="patient-info" style={{ marginTop: "10px", textAlign: "left", padding: "5px" }}>
        <h4>Patient ID: 123456</h4>
        <p>Blood Type: O+</p>
        <p>Platelets: 150</p>
      </div>
    </div>
  );
};

export default RightPanel;
