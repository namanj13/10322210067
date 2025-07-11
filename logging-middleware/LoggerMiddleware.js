// src/LoggerMiddleware.js

// Log an event with timestamp, action, and optional data
export const logEvent = (action, data = {}) => {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];

  logs.push({
    timestamp: new Date().toISOString(),
    action,
    data,
  });

  localStorage.setItem("logs", JSON.stringify(logs));
};

// Get all logs (for stats or debugging)
export const getLogs = () => {
  return JSON.parse(localStorage.getItem("logs")) || [];
};
