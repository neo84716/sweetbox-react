// StatusButton.jsx
import React from "react";

export const STATUS = {
  UNPROCESSED: "unprocessed",
  PROCESSED: "processed",
};

const StatusButton = ({ status, onClick }) => {
  const isProcessed = status === STATUS.PROCESSED;

  return (
    <button
      className={`status-btn ${isProcessed ? "processed" : "unprocessed"}`}
      onClick={onClick}
    >
      {isProcessed ? "已處理" : "未處理"}
    </button>
  );
};

export default StatusButton;
