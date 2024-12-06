import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoHostal from "../assets/logo-hostal-la-casa.png";

const NavBar = () => {
  const { isAuthenticated, logout, user, } = useAuth();
  return (
    <nav className=" bg-slate-200 shadow flex justify-between  h-[10vh] px-10 ">
      <ul className="flex w-full justify-between items-center">
        <li className="flex flex-grow basis-0">
          <Link to={"/"}>
            <img src={logoHostal} width={125} className="" />
          </Link>
        </li>
        
        {isAuthenticated ? (
          <div className="flex flex-grow basis-0">
            <li className="flex flex-grow basis-0 justify-end">
              <Link
                to="/"
                className="px-6 py-2 border border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition ease-in"
                onClick={() => logout()}
              >
                Cerrar Sesion
              </Link>
            </li>
          </div>
        ) : (
          <div className="flex gap-2">
            <li>
              <Link
                to="/login"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-700 hover:shadow-sm transition ease-in"
              >
                Iniciar Sesion
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="px-6 py-2 border border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition ease-in"
              >
                Registrarse
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
