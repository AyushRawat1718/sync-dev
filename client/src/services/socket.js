import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

let currentProjectId = null;

export const setProjectId = (projectId) => {
  currentProjectId = projectId;
};

export const getProjectId = () => {
  return currentProjectId;
};

export default socket;
