import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="flex items-center h-[90vh] justify-center ">
      <div className="flex flex-col items-center h-auto bg-slate-200 max-w-md w-full p-10 rounded-md shadow-lg">
        <h1 className="text-4xl font-bold mb-10">Inicio de Sesion</h1>

        <form className="flex flex-col w-80 " onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { requireda: true })}
            name="email"
            placeholder="Email"
            className="w-full bg-slate-100  px-4 py-2 rounded-md my-2 shadow"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            name="password"
            placeholder="Contraseña"
            className="w-full bg-slate-100  px-4 py-2 rounded-md my-2 shadow"
          />
          {errors.password && (
            <p className="text-red-500">Paswword is required</p>
          )}

          {signinErrors.map((error, i) => (
            <div
              key={i}
              className="bg-red-500 px-1 my-1 text-white rounded text-center"
            >
              {error}
            </div>
          ))}

          <button
            className="bg-cyan-700 text-white p-1 rounded-md my-2 hover:bg-cyan-900 transition ease-in-out shadow"
            type="submit"
          >
            Iniciar Sesion
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">
          No tienes una cuenta?
          <Link
            className="text-sky-500 underline hover:text-sky-700 transition ease-in-out"
            to="/register"
          >
            Crear Cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;