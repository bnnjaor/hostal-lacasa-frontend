import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Scheduler } from "@aldabil/react-scheduler";

// Configurar el localizador para Day.js

// Función para obtener las reservas desde el backend
const fetchReservations = async () => {
  const { data } = await axios.get("http://localhost:3000/api/reservs");
  return data;
};

const CalendarPage = () => {
  // Usar React Query para obtener las reservas
  const {
    data: reservations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reservs"],
    queryFn: fetchReservations,
  });

  const roomColors = {
    1: "#353f7a", // Naranja
    2: "#1f566b", // Verde
    3: "#3357FF", // Azul
    4: "#FF33A1", // Rosa
    5: "#FFD700", // Dorado
    // Agrega más colores según sea necesario
  };

  // Convertir las reservas al formato que usa react-big-calendar
  const events = reservations?.map((reserv) => ({
    title: `Habitacion ${reserv.roomId.number}`,
    subtitle: reserv.clientName,
    start: new Date(reserv.startDate),
    end: new Date(reserv.endDate),
    color: roomColors[reserv.roomId.number] || "#eee",
  }));

  if (isLoading)
    return (
      <div>
        Cargando reservas...
      </div>
    );
  if (error) return <p>Error al cargar las reservas: {error.message}</p>;

  return (
    <div>
      <Scheduler view="month" events={events} agenda={false} />
    </div>
  );
};

export default CalendarPage;
