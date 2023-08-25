import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../config/axios";
import DetalleOrdenes from "../vistas/DetalleOrdenes";

const Cocina = () => {
  const [ordenes, setordenes] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      // obtenemos los pedidos
        // aqui cambie la url a consultar
      const resultado = await clienteAxios.get("/orden-pro");
    //   console.log(resultado.data)
      setordenes(resultado.data);
    };
    consultarApi();
  }, []);

  return (
    <Fragment>
      <h2>Pedidos</h2>

      <ul className="listado-pedidos">
        {ordenes.map(orden => (
            <DetalleOrdenes
            key= {orden.id_orden}
            orden={orden}
             />
        ))}
      </ul>
    </Fragment>
  );
};

export default Cocina;
