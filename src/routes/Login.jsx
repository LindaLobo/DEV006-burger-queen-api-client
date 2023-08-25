import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const [nombre, setnombre] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const hadleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        nombre,
        password,
      });
      const token = response.data.token;
      sessionStorage.setItem("token", token);
      setAuth({ token, auth: true });
      navigate("/menu");
    } catch (error) {
      console.log("se genero un error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}!`,
      });
    }
  };
  
  useEffect(() => {
    if (auth.token !== "" && auth.token !== null) {
      navigate("/menu");
    }
  });

  return (
    <div>
      <form className="formulario_login">
        {/* <!-- Nombre input --> */}
        <div className="form-outline mb-4 ç">
          <input
            type="nombre"
            id="input_nombre"
            placeholder="Nombre"
            className="form-control"
            name="nombre"
            onChange={(e) => setnombre(e.target.value)}
            value={nombre}
          />
          <label className="form-label m-2">Nombre del Usuario</label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            type="password"
            id="input_password"
            placeholder="Password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label className="form-label m-2">Password de Usuario</label>
        </div>

        {/* <!-- button --> */}
        <button
          onClick={hadleLogin}
          type="button"
          className="btn btn-dark btn-block mb-4"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
