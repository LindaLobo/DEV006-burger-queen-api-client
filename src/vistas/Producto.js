import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";


const Producto = (producto) => {
//   console.log(producto.producto);

  const productos = producto.producto;

  const { id_prod, nombre_producto, precios, stock } = productos;

  const eliminarProducto = (id_prod) => {
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
            .delete(`/productos/${id_prod}`, productos)
              .then((res) => {
              console.log(res);
              Swal.fire("Eliminado!", res.data.message, "success");
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops... Error al eliminar, revise orden-producto",
                text: err.response.data,
              });
            });
        }
      });
  }

  return (
    <div>
      <ul className="listado-productos">
        <li className="producto">
          <div className="info-producto">
            <p className="id">Id: {id_prod} </p>
            <p className="nombre_producto">Nombre: {nombre_producto} </p>
            <p className="precio">Precio. ${precios} </p>
            <p className="stock">Stock: {stock} </p>
          </div>
          <div className="botones_productos">
            <Button variant="primary">
              <Link to={`/productos/editar/${id_prod}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Producto
              </Link>
            </Button>
            <Button
              variant="danger"
              type="button"
              className="btn btn-danger  btn-eliminar"
              onClick={() => eliminarProducto(id_prod)}>
              <i className="fas fa-times"></i>
              Eliminar Producto
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Producto;
