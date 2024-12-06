import axios from "./axios.js";

export const getAllReservsRequest = () => axios.get("/reservs");
export const createRoomRequest = (room) => axios.post("/reservs", room);
export const updateRoomRequest = async (room, id) => {
  try {
    const res = await axios.put(`/reservs/${id}`, room);
    console.log(res)
  } catch (error) {
    console.log("Erroe in request: ", error);
  }
};
export const deleteRoomRequest = (id) => axios.delete(`/reservs/${id}`);
