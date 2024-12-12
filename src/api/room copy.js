import axios from "./axios.js";

export const getAllReservsRequest = () => axios.get("/reservs");
export const createRoomRequest = (room) => axios.post("/reservs", room);
