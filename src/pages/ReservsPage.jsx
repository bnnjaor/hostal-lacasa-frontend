import { useRoom } from "../context/RoomContext";
import React, { useEffect } from "react";
import RoomCard from "../components/RoomCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ReservsPage = () => {
  const navigate = useNavigate();
  const { rooms, getRooms } = useRoom();
  const {user}= useAuth()

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="flex py-10 items-center h-[90vh] flex-col ">
      <div  className="w-2/4">
        {rooms.map((room) => (
          <RoomCard room={room} key={room._id} />
        ))}
      </div>
       {user?.isAdmin && <button
        onClick={() => navigate("/rooms/add-room")}
        className=" bg-green-500 text-white px-2 py-2 mb-4 rounded-md hover:bg-green-800 transition-all ease-in-out"
      >
        Agregar Habitacion
      </button>} 
      
    </div>
  );
};

export default ReservsPage;
