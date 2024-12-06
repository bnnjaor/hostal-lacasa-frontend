import { useForm } from "react-hook-form";
import { useRoom } from "../context/RoomContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RoomFormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createRoom, updateRoom, getRoom } = useRoom();
  const navigate = useNavigate();
  const params = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (params.id) {
      const loadRoom = async () => {
        const response = await getRoom(params.id);
        setRoom(response);
        if (response) {
          setValue("number", response.number);
          setValue("price", response.price);
          setValue("description", response.description);
        }
      };
      loadRoom();
    }
  }, [params.id]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("number", data.number);
    formData.append("price", data.price);
    formData.append("description", data.description);
    
    // Agrega cada archivo de imagen al FormData
    if (data.image) {
      Array.from(data.image).forEach((file) => {
        formData.append("image", file);
      });
    }

    if (params.id) {
      await updateRoom(formData, params.id);
    } else {
      await createRoom(formData);
    }

    navigate("/rooms");
  });

  return (
    <div className="container mx-auto my-10 p-4 max-w-screen-xl">
      <div className="bg-white rounded-lg shadow-lg p-6 flex lg:flex-row gap-6 ">
        <div>
          <h1 className="text-4xl font-light text-zinc-800 mb-5">
            {params.id ? "ACTUALIZAR HABITACION" : "NUEVA HABITACION"}
          </h1>
          
          {room && room.images && (
            <div className="flex flex-wrap gap-4">
              {room.images.map((img, index) => (
                <img
                  key={index}
                  src={img.secure_url} 
                  alt={`Imagen ${index + 1} de la habitación ${room.number}`}
                  className="w-48 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        <form className="flex flex-col w-full space-y-2" onSubmit={onSubmit}>
          <div>
            <label className="font-bold text-xl" htmlFor="number">
              Numero de Habitacion
            </label>
            <input
              type="number"
              placeholder="number"
              {...register("number", {
                required: "El número de habitación es requerido",
              })}
              autoFocus
              className="w-full bg-slate-50 px-4 py-1 rounded-md my-2"
            />
            {errors.number && (
              <p className="text-red-500">{errors.number.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold text-xl" htmlFor="price">
              Precio
            </label>
            <input
              type="number"
              {...register("price", { required: "El precio es requerido" })}
              placeholder="Precio"
              className="w-full bg-slate-50 px-4 py-2 rounded-md my-2"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div>
            <label className="font-bold text-xl" htmlFor="description">
              Descripcion
            </label>
            <textarea
              {...register("description", {
                required: "La descripcion es requerida",
              })}
              placeholder="Descripcion"
              className="w-full bg-slate-50 px-4 py-2 rounded-md my-2"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <label className="font-bold text-xl" htmlFor="image">
            Imagenes
          </label>

          <input type="file" {...register("image")} multiple />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}

          <button className="bg-green-500 hover:bg-green-700 transition-all ease-in-out p-2 rounded-md text-xl font-semibold">
            Guardar
          </button>
          <button
            onClick={() => navigate("/rooms")}
            type="button"
            className="hover:bg-slate-300 hover:text-black p-2 rounded-md text-lg transition-all ease-in-out"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomFormPage;
