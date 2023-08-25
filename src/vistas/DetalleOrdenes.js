import React, { Fragment } from "react";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuth } from "../context/AuthProvider";


const DetalleOrdenes = ({ orden }) => {
  const cliente = orden;
  console.log(cliente)


  const { auth } = useAuth();
  let decoded = jwt_decode(auth.token);


  const retirarOrden = async() => {
   await clienteAxios.put(`/orden/${cliente.id_orden}`, {finalizado:true, id_empl:decoded.id_empleado, cliente:cliente.cliente_nombre, mesa: cliente.mesa})
   
  }

  return (
    <Fragment>
      <li className="pedido">
        <div className="info-pedido">
          <p className="id">ID: {cliente.id_orden} </p>
          <p className="id">Mesa: {cliente.mesa} </p>
          <p className="nombre">Cliente: {cliente.cliente_nombre} </p>
          <div className="articulos-pedido">
            <p className="productos">Artículos Pedido: </p>
            <ul>
              {cliente.nombre_producto.map((detalle, index) => (
                <p key={index + 1}> {detalle}</p>
              ))}
            </ul>
            {/* <p className="total">Total: {cliente.precios} </p> */}
          </div>
          <div className="acciones">
          <Link to={`/menu/`} className="btn btn-azul">
          <form onClick={() => retirarOrden(cliente.id_orden)} >
            <input type="submit" className="btn btn-success btn-block" value="Pedido Listo" />
          </form>
          </Link>
          
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default DetalleOrdenes;
