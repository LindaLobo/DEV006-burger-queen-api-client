import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../config/axios";
import { useAuth } from "../context/AuthProvider";
import Empleado from "../vistas/Empleado";
import { Link } from "react-router-dom";
import Spinner from "../componentes/layout/Spinner"

const Empleados = () => {
  const { auth } = useAuth();
  //   console.log(auth.token);

  //trabajar con el state

  const [empleados, setEmpleados] = useState([]);
  const consultarApi = async () => {
    try {
      const empleadoConsulta = await clienteAxios.get("/empleados", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
    //   console.log(empleadoConsulta.data);

      //guardamos el resultado en el state
      setEmpleados(empleadoConsulta.data.empleados);
    } catch (error) {
      console.log("error al conectar", error);
    }
  };

  useEffect(() => {
    if (auth.token !== "" && auth.token !== null) {
      consultarApi();
    }
  }, [empleados]);

  if(!empleados.length) return <Spinner/>


  return (
    <Fragment>
      <h2>Empleados</h2>

      <Link to={"/empleados/nuevo"} className="btn btn-success nvo-cliente"> 
      <i className="fas fa-plus-circle"></i>
                Nuevo Empleado
            </Link>

      <ul className="listado-clientes">
        {empleados.map(empleado =>(
        <Empleado
            key={empleado.id_empl}
            empleado={empleado}
        />
        ))}
      </ul>
    </Fragment>
  );
};

export default Empleados;
