import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/rooms");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex items-center h-[calc(100vh-100px)] justify-center">
      <div className="flex flex-col bg-slate-200 max-w-md p-10 rounded-md items-center">
        <h1 className="text-4xl font-bold my-2">Registrarse</h1>

        {registerErrors.map((error, i) => (
          <div
            key={i}
            className="bg-red-500 p-1 my-1 text-white rounded text-center"
          >
            {error}
          </div>
        ))}

        {/* {signinErrors.map((error, i) => (
          <div
            key={i}
            className="bg-red-500 px-1 my-1 text-white rounded text-center"
          >
            {error}
          </div>
        ))} */}
        <form className="flex flex-col w-80" onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            name="username"
            placeholder="Nombre de Usuario"
            className="w-full bg-slate-100  px-4 py-2 rounded-md my-2"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            type="email"
            {...register("email", { requireda: true })}
            name="email"
            placeholder="Email"
            className="w-full bg-slate-100  px-4 py-2 rounded-md my-2"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            name="password"
            placeholder="Contraseña"
            className="w-full bg-slate-100 px-4 py-2 rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500">Paswword is required</p>
          )}

          <button
            className="bg-cyan-700 text-white p-1 rounded-md my-2 hover:bg-cyan-900 shadow"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-center">
          Ya tienes una cuenta?
          <Link
            className="text-sky-500 underline hover:text-sky-700 transition ease-in-out"
            to="/login"
          >
            Iniciar Sesion
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
