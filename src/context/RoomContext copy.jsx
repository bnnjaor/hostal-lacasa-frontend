import { createContext, useContext, useState } from "react";
import {
  createRoomRequest,
  deleteRoomRequest,
  getAllRoomRequest,
  getOneRoomRequest,
  updateRoomRequest,
} from "../api/room.js";

const ReservContext = createContext();

export const useReserv = () => {
  const context = useContext(ReservContext);

  if (!context) {
    throw new Error("useRoom must be used within a roomProvider");
  }

  return context;
};

export const ReservProvider = ({ children }) => {
  const [reserv, setReserv] = useState([]);

  const getReservs = async () => {
    try {
      const res = await getAllRoomRequest();
      setReserv(res.data);
    } catch (error) {}
  };

  const getRoom = async (id) => {
    try {
      const res = await getOneRoomRequest(id);
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
