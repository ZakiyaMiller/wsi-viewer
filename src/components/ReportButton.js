import React from "react";
import jsPDF from "jspdf";

const ReportButton = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Whole Slide Image Report", 20, 20);
    doc.text("Findings Summary:", 20, 40);
    doc.text("- Angled Cells: 222 (67%)", 20, 50);
    doc.text("- Burr Cells: 87 (34%)", 20, 60);
    doc.save("WSI_Report.pdf");
  };

  return <button onClick={generatePDF}>Download Report</button>;
};

export default ReportButton;
