import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Lateral = () => {
  const { auth } = useAuth();
  // console.log(auth)
  const menuLateral = () => {
    if (auth.auth) {
        return(
      <aside className="sidebar col-3">
        <h2>Administración</h2>

        <nav className="navegacion">
          <Link to={"/menu"} className="clientes">
            Menu
          </Link>
          <Link to={"/productos"} className="productos">
            Productos
          </Link>
          <Link to={"/empleados"} className="pedidos">
            Empleados
          </Link>
          
          <Link to={"/cocina"} className="cocina">
            Cocina
          </Link>
        </nav>
      </aside>)
    } else {
      return null;
    }
  };
  return <>{menuLateral()}</>
};

export default Lateral;
