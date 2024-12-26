import { useState, useEffect } from "react";
import { useRoom } from "../context/RoomContext";
import { useParams } from "react-router-dom";

const RoomPage = () => {
  const [room, setRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const params = useParams();
  const { getRoom } = useRoom();
  console.log(params)

  useEffect(() => {
    if (params.id) {
      const loadRoom = async () => {
        try {
          const response = await getRoom(params.id);
          setRoom(response);
        } catch (error) {
          console.log(error);
        }
      };
      loadRoom();
    }
  }, [params.id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!room) return <p>Loading...</p>;

  return (
    <div className="container mx-auto my-10 p-4 max-w-screen-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col lg:flex-row gap-6">
        <div className="relative max-w-lg mx-auto">
          <img
            src={room.images[currentImageIndex].secure_url}
            alt={`Imagen de habitación ${room.number}`}
            className="w-72 h-72 object-cover rounded-md"
          />

          {room.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
              >
                {"<"}
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
              >
                {">"}
              </button>
            </>
          )}

          {/* Miniaturas */}
          <div className="flex justify-center mt-4 gap-2">
            {room.images.map((img, index) => (
              <img
                key={index}
                src={img.secure_url}
                alt={`Miniatura ${index + 1}`}
                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                  index === currentImageIndex ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => selectImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Habitación {room.number}
          </h1>
          <p className="text-2xl font-semibold text-green-600 mb-2">
            ${room.price}
          </p>

          <p className="text-gray-700 text-lg mb-4">{room.description}</p>

          <div className="flex gap-4">
            <button className="w-full md:w-auto text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
              Reservar
            </button>
            <button className="w-full md:w-auto text-white bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition-all">
              Consultar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
