import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

let currentProjectId = localStorage.getItem("projectId");

export const setProjectId = (projectId) => {
  currentProjectId = projectId;
  localStorage.setItem("projectId", projectId);
};

export const getProjectId = () => {
  return currentProjectId;
};

export const clearProjectId = () => {
  currentProjectId = null;
  localStorage.removeItem("projectId");
};

export default socket;
