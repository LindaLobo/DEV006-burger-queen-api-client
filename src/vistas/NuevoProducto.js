import React, { useState, Fragment } from "react";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NuevoProducto = () => {
  const [producto, setProducto] = useState({
    nombre_producto: "",
    precios: "",
    stock: "",
  });

  const navigate = useNavigate();

  //leer los datos del form
  const informacionProducto = e => {
    setProducto({ ...producto, [e.target.name]: e.target.value })
    console.log(e.target.name)
    console.log(e.target.value)
  };


  console.log(producto)

  // validar los campos
    const validarProducto= () => {
      const {nombre_producto, precios, stock} = producto
      //todo debe tener contenido
      let valido = !nombre_producto.length || !precios.length || !stock.length;
      return valido;
  }

  //agregando el nuevo producto

  const agregarProducto = async e => {
    e.preventDefault();
    clienteAxios.post("/productos", producto)
    .then(res => {
        Swal.fire(
            'Producto Guardado',
            res.data.message,
            'success'
          )
    })
    .catch (error =>  {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops... Error al guardar",
        text: error.res.data,
      });
    })
    navigate("/productos");
  };

  return (
    <Fragment>
      <h2>Nuevo Producto</h2>

      <form onSubmit={agregarProducto}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre_producto"
            onChange={informacionProducto}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precios"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={informacionProducto}
          />
        </div>

        <div className="campo">
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            min="0.00"
            step="0.01"
            placeholder="Stock"
            onChange={informacionProducto}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
            disabled={validarProducto()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default NuevoProducto;
