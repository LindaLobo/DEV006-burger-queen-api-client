import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const Empleado = ({empleado}) => {
  // const persona = empleado;
  // console.log(persona)

  //extraer los valores

  const { id_empl, nombre, email, id_rol } = empleado;

  const eliminarEmpleado = (id_empl) => {
    Swal.fire({
      title: "¿Estas seguro que quieres eliminar?",
      text: "Usted no podra revertir el cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        //llamado a axios
        clienteAxios
          .delete(`/empleados/${id_empl}`, empleado)
            .then((res) => {
            console.log(res);
            Swal.fire("Eliminado!", res.data.message, "success");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops... Error al eliminar, revise las ordenes",
              text: err.response.data,
            });
          });
      }
    });
  };
  
  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">Nombre: {nombre}</p>
        {/* <p className="password">Password: {password}</p> */}
        <p className="email">Email: {email}</p>
        <p className="id_empl">Id-Empleado: {id_empl}</p>
        <p className="id_rol">Id-Rol: {id_rol}</p>
      </div>
      <div className="acciones">
        <Button variant="primary">
          <Link to={`/empleados/editar/${id_empl}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Empleado
          </Link>
        </Button>
        <Button
          variant="danger"
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarEmpleado(id_empl)}
        >
          <i className="fas fa-times"></i>
          Eliminar Empleado
        </Button>
      </div>
    </li>
  );
};


export default Empleado;
