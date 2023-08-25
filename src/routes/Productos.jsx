import Producto from "../vistas/Producto.js"
import React, { useEffect, useState, Fragment } from "react";
import Button from 'react-bootstrap/Button';
import clienteAxios from "../config/axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Spinner from "../componentes/layout/Spinner"

const Productos = () => {
    const { auth } = useAuth();
    const [productos, setProductos] = useState([]);
    const consultarApi = async () => {
      try {
        const productoConsulta = await clienteAxios.get("/productos", {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        // console.log(productoConsulta.data);
  
        //guardamos el resultado en el state
        setProductos(productoConsulta.data.productos);
      } catch (error) {
        console.log("error al conectar", error);
      }
    };
  
    useEffect(() => {
      if (auth.token !== "" && auth.token !== null) {
        consultarApi();
      }
    }, [productos]);

    //spinner de carga

    if(!productos.length) return <Spinner/>
  
    return (
      <Fragment>
        <h2>PRODUCTOS</h2>
  
        <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> 
        <Button variant="success">
        <i className="fas fa-plus-circle"></i>
                  Agregar Producto
                  </Button>
              </Link>
              
  
        <ul className="listado-producto">
          {productos.map(producto =>(
          <Producto
              key={producto.id_prod}
              producto={producto}
          />
          ))}
        </ul>
      </Fragment>
    );
};

export default Productos;