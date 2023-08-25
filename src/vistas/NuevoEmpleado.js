import React, { Fragment,useState } from "react";
import Button from 'react-bootstrap/Button';
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const NuevoEmpleado = () => {

    const navigate = useNavigate()

    const [empleado, setEmpleado] = useState({
        nombre: "",
        password: "",
        email: "",
        id_rol:""
    });


    //leer los datos del fomulario
    const actualizarState = e => {
        //almarcenar lo que el usuario escribe en el state
        setEmpleado({
            ...empleado, [e.target.name] : e.target.value
        })
        // console.log(empleado)
    }

    const validarEmpleado= () => {
        const {nombre, password, email, id_rol} = empleado
        //todo debe tener contenido
        let valido = !nombre.length || !password.length || !email.length || !id_rol.length;
        return valido;
    }

    //añadimos un empleado nuevo

    const agregarEmpleado = e => {
        e.preventDefault()
        clienteAxios.post("/empleados", empleado)
        .then(res => {
            Swal.fire(
                'Empleado Guardado',
                res.data.message,
                'success'
              )
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops... Error al guardar',
                text: err.response.data,
            })  
        }) 
        //redireccionamos si existe
        navigate('/empleados')
    }

  return (
    <Fragment>
      <h2>Nuevo Cliente</h2>

      <form
      onSubmit={agregarEmpleado}
      >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Empleado" name="nombre" onChange={actualizarState} />
        </div>

        <div className="campo">
          <label>Password:</label>
          <input type="text" placeholder="Password Empleado" name="password" onChange={actualizarState} />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Empleado" name="email" onChange={actualizarState} />
        </div>


        <div className="campo">
          <label>Id-rol:</label>
          <input type="number" placeholder="Id-rol" name="id_rol" onChange={actualizarState} />
        </div>

        <div className="guardar">
            <Button variant="success">
          <input type="submit" className="btn btn-azul" value="Agregar Empleado"
          disabled={validarEmpleado()} />
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default NuevoEmpleado;
