import { useEffect, Fragment } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import { useState } from "react";
import Swal from "sweetalert2";


const Menu = ({ token }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    if (auth.token !== "" && auth.token !== null) {
    } else {
      navigate("/");
    }
  }, [ordenes]);

  const pedidoListo = async () => {
    try {
      const response = await clienteAxios.get("/orden");
      const resultado = response.data;
      setOrdenes(resultado);
    //   console.log(resultado);
    } catch (error) {
      console.error("Error al obtener las órdenes:", error);
    }
  };

  const ordenesFinalizadas = ordenes.filter(
    (orden) => orden.finalizado === true
  );

  const ordenID = ordenes.map(orden => orden.id_orden)
//   console.log(ordenID)

  const eliminarOrden = (ordenID) => {
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
          .delete(`/orden/${ordenID}`)
            .then(async(res) => {
            console.log(res);
            Swal.fire("Eliminado!", res.data.message, "success");
            await pedidoListo()
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
    <Fragment>
      <div>
        <h1>Bienvenidos al Menu</h1>
        <Button variant="primary">
          <Link to={`/menu/nuevo/`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Nueva Orden
          </Link>
        </Button>
      </div>
      <div className="boton_ordenes">
        <Button variant="warning" onClick={pedidoListo}>
        <i class="fa-solid fa-bowl-rice"></i>
          Ver ordenes actuales
        </Button>
        </div>
        <div className="tarjetas_ordenes">
          {ordenesFinalizadas.map((orden) => (
            <div style={{margin:5}} key={orden.id_orden}>
              <Card>
                <Card.Header>ID de la Orden: {orden.id_orden}</Card.Header>
                <Card.Body>
                  <Card.Title>ID del empleado: {orden.id_empl}</Card.Title>
                  <Card.Text>
                    Cliente: {orden.cliente}, Mesa: {orden.mesa}
                  </Card.Text>
                  <Button variant="primary" onClick={() => eliminarOrden(orden.id_orden)} >Retirado de Cocina</Button>
                </Card.Body>
              </Card>

            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default Menu;
