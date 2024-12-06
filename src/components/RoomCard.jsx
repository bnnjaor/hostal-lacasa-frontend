import { useRoom } from "../context/RoomContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoomCard = ({ room }) => {
  const { deleteRoom } = useRoom();
  const { user } = useAuth();

  return (
    <div className="flex gap-2 shadow bg-slate-100 p-2 rounded-md max-w-screen-lg my-4">
      {/* Imagen principal */}
      {room.images && room.images.length && (
        <img
          src={room.images[0].secure_url} // Usa la primera imagen si está disponible
          width={300}
          alt={`Habitación ${room.number}`}
        />
      )}
      <div className=" w-full p-4 flex flex-col justify-between">
        <div>
          {/* Número de habitación y precio */}
          <h1 className="text-2xl font-bold mb-2">
            Habitación {room.number} - ${room.price}
          </h1>

          {/* Descripción */}
          <p className="font-normal text-lg mb-4">{room.description}</p>
        </div>

        {/* Botón de "Más Información" */}
        <div className="flex justify-end items-center gap-x-4">
          {user?.isAdmin && (
            <div className="flex gap-x-2 mt-4">
              <button
                onClick={() => deleteRoom(room._id)}
                className="text-lg text-white bg-red-500 rounded-md p-2 flex items-center hover:bg-red-700 transition-all ease-in"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
              <Link
                to={`/rooms/${room._id}`}
                className="text-lg text-white bg-blue-500 p-2 rounded-md flex items-center hover:bg-blue-700 transition-all ease-in"
              >
                <span className="material-symbols-outlined">upload_2</span>
              </Link>
            </div>

            
          )}
          
          <Link
            className="bg-blue-500 text-white text-lg p-2 rounded-md hover:bg-blue-700 transition-all ease-in"
            to={`/rooms/room/${room._id}`}
          >
            Más Información
          </Link>
        </div>

        {/* Opciones de administrador */}
      </div>
    </div>
  );
};

export default RoomCard;
