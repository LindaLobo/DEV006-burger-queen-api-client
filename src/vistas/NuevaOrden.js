import React, { useState, useEffect, Fragment } from "react";
import clienteAxios from "../config/axios";
import BuscarProducto from "./BuscarProducto";
import Swal from "sweetalert2";
import CantidadProducto from "./CantidadProducto";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import jwt_decode from "jwt-decode";



const NuevaOrden = () => {


  const { auth } = useAuth();
  let decoded = jwt_decode(auth.token);

  const [busqueda, setBusqueda] = useState("")
  const [producto, setProducto] = useState([]);
  const [total, setTotal] = useState(0);
  const [cliente, setCliente] = useState("");
  const [mesa, setMesa] = useState("")

  const navigate = useNavigate();


  // actualizamos de manera automatica, para cuando cambien los productos

  useEffect (() => {
    actualizarTotal()
  }, [producto])

  const buscarProducto = async e => {
    e.preventDefault()
    const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)
    console.log(resultadoBusqueda)
    // en caso de que no existan resultados

    if(resultadoBusqueda.data[0]) {
      let productoResultado = resultadoBusqueda.data[0];
      productoResultado.producto = resultadoBusqueda.data[0]
      productoResultado.cantidad = 0

      setProducto([...producto, productoResultado])

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops... No hay resultado",
        text: 'sin resultados',

      })
    }
  }

  const leerDatosBusqueda = e => {
    // console.log(e.target.value)
    setBusqueda(e.target.value)
  }

  // actualizando la cantidad de productos
  const restarProducto = (index) => {
    // console.log('uno menos', index)
    const todosProductos = [...producto]

    if(todosProductos[index].cantidad === 0) return;

    todosProductos[index].cantidad--;

    //almacenamos en el estado

    setProducto(todosProductos)

  }
  const sumarProducto = (index) => {
    // console.log('uno mas', index)
    const todosProductos = [...producto]

    todosProductos[index].cantidad++;

    //almacenamos en el estado

    setProducto(todosProductos)
  }

  // eliminar un producto del state

  const eliminarProductoPedido = id_prod => {
    const todosProductos = producto.filter(producto => producto.id_prod !== id_prod)
    // console.log(todosProductos)
    setProducto(todosProductos)
  }

  //Actualizar el total a pagar

  const actualizarTotal = () => {
    if(producto.length === 0) {
      setTotal(0)
      return;
    } else {
      let nuevoTotal = 0
      //recorremos los productos y sus cantidades y precios
      producto.map(producto => nuevoTotal += (producto.cantidad * producto.precios))
      setTotal(nuevoTotal);
    }
  }

    //datos del cliente 

    const leerDatosCliente = e => {
      const cliente = e.target.value
      setCliente(cliente)
    };

    //datos de la mesa 

    const leerDatosMesa = e => {
      const mesa = e.target.value
      setMesa(mesa)
    }

  // realizar el pedido en la base de datos

  const realizarpedido = async e => {
    e.preventDefault()

    const productos_ids = []

    //recorremos los productos en el pedido para tomar sus id para la orden

    producto.forEach(producto => {
      for (let i = 0; i < producto.cantidad; i++) {
        productos_ids.push(producto.id_prod);
      }
    });
  
    //construimos nuestro objeto
    const pedido = {
      "cliente": cliente,
      "id_empl": decoded.id_empleado,
      "productos_ids": productos_ids,
      "finalizado" : false,
      "total" : total,
      "mesa": mesa
  }

  const resultado = await clienteAxios.post("/orden", pedido)

  // console.log(resultado)
  if(resultado.status === 201){
    Swal.fire({
      icon: "success",
      title: "Correcto",
      text: resultado.data.message
  })
  }else {
    Swal.fire({
      icon: "error",
      title: "Oops... Hubo un error",
      text: 'vuelva a intentarlo',
  })
  }
  // redireccionar 

  navigate("/menu")
  }

  return (
    <Fragment>
      <h2>Nueva Orden</h2>
        <legend>Datos del cliente</legend>
        <div className="campo_cliente">
          <div>
            <label>Nombre del Cliente: </label>
            <input
              type="text"
              placeholder="Nombre Cliente"
              name="nombre_cliente"
              onChange={leerDatosCliente}
            />
          </div>
          <div>
            <label>Mesa del Cliente: </label>
            <input
              type="number"
              placeholder="Mesa del cliente"
              name="mesa_cliente"
              onChange={leerDatosMesa}
            />
          </div>
        </div>

        <BuscarProducto
        buscarProducto = {buscarProducto}
        leerDatosBusqueda = {leerDatosBusqueda}

        />

        <ul className="resumen">
          {producto.map((producto, index) => (
            <CantidadProducto
            key={producto.id_prod}
            producto={producto}
            restarProducto = {restarProducto}
            sumarProducto = {sumarProducto}
            index={index}
            eliminarProductoPedido={eliminarProductoPedido}
            />
          ))}
        </ul>
        <p className="total">Total a pagar: <span>${total}</span> </p>
        { total > 0 ? (
          <form onSubmit={realizarpedido} >
            <input type="submit" className="btn btn-success btn-block" value="Realizar Pedido" />
          </form>
        ): null }
    </Fragment>
  );
};

export default NuevaOrden;
