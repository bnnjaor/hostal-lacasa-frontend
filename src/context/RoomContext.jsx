import { createContext, useContext, useState } from "react";
import {
  createRoomRequest,
  deleteRoomRequest,
  getAllRoomRequest,
  getOneRoomRequest,
  updateRoomRequest,
} from "../api/room.js";

const RoomContext = createContext();

export const useRoom = () => {
  const context = useContext(RoomContext);

  if (!context) {
    throw new Error("useRoom must be used within a roomProvider");
  }

  return context;
};

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  const getRooms = async () => {
    try {
      const res = await getAllRoomRequest();
      setRooms(res.data);
    } catch (error) {}
  };

  const getRoom = async (id) => {
    try {
      const res = await getOneRoomRequest(id);
      console.log(id)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createRoom = async (room) => {
    try {
      const res = await createRoomRequest(room);
    } catch (error) {
      console.log(error.response.data)
    }
  };

  const updateRoom = async (room, id) => {
    try {
      const res = await updateRoomRequest(room, id);
      await getRooms()
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await deleteRoomRequest(id);
      await getRooms()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        getRooms,
        createRoom,
        getRoom,
        updateRoom,
        deleteRoom
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
