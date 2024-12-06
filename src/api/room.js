import axios from "./axios.js";

export const getAllRoomRequest = () => axios.get("/rooms");
export const getOneRoomRequest = (id) => axios.get(`/rooms/${id}`);
export const createRoomRequest = (room) => axios.post("/rooms", room);
export const updateRoomRequest = async (room, id) => {
  try {
    const res = await axios.put(`/rooms/${id}`, room);
    console.log(res)
  } catch (error) {
    console.log("Erroe in request: ", error);
  }
};
export const deleteRoomRequest = (id) => axios.delete(`/rooms/${id}`);
