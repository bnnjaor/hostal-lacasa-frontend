import { createContext, useContext, useState } from "react";

import { getAllReservsRequest } from "../api/room copy.js";

const ReservContext = createContext();

export const useReserv = () => {
  const context = useContext(ReservContext);

  if (!context) {
    throw new Error("useReserv must be used within a reservProvider");
  }

  return context;
};

export const ReservProvider = ({ children }) => {
  const [reserv, setReserv] = useState([]);

  const getReservs = async () => {
    try {
      const res = await getAllReservsRequest();
      setReserv(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <ReservContext.Provider value={{ reserv, getReservs }}>
      {children}
    </ReservContext.Provider>
  );
};
