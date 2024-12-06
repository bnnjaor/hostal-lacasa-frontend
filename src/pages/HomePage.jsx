import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import hostalimage from "../assets/hostal-la-casa.jpg";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <div
        className="relative h-[90vh]  bg-cover bg-center"
        style={{ backgroundImage: `url(${hostalimage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6">
          <h1 className="text-7xl font-bold">
            Hostal La Casa <span className="text-orange-400">AICUÑA</span>
          </h1>
          <p className="mt-4 text-lg max-w-screen-xl">
            Descubre la serenidad en el encantador Hostal La Casa, ubicado en el
            idílico pueblo de Aicuña, en la hermosa provincia de La Rioja,
            Argentina, alojamiento próximo al{" "}
            <span className="text-green-500">Parque Nacional de Talampaya</span>{" "}
            y el{" "}
            <span className="text-green-500">
              Parque Provincial Ischigualasto
            </span>
            . Este refugio de tranquilidad ofrece comodidades excepcionales y
            una ubicación perfecta para explorar la riqueza natural de la
            región.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link
              to="/rooms"
              className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-700 transition ease-in"
            >
              Hacer una Reserva
            </Link>
            <button className="px-6 py-2 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-black transition ease-in">
              Mas Informacion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
