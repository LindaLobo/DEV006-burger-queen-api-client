import React, {useState, Fragment, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";



const EditarEmpleado = () => {

    //obtener el id

    const {id_empl} = useParams()
    // console.log(id_empl)

    const navigate = useNavigate()

    const [empleado, setIdEmpleado] = useState({
        nombre: "",
        password: "",
        email: "",
        id_rol:""
    });

    //query a la API

    const consultarApi = async() => {
        const empleadoConsulta = await clienteAxios.get(`/empleado/${id_empl}`)
        setIdEmpleado(empleadoConsulta.data.id[0])
        // console.log(empleadoConsulta.data.id[0])
    }

    //useEffect cuando el componente carga
    useEffect( () => {
        consultarApi()
    }, [])


    //leer los datos del fomulario
    const actualizarState = e => {
        //almarcenar lo que el usuario escribe en el state
        setIdEmpleado({
            ...empleado, [e.target.name] : e.target.value
        })
        // console.log(empleado)
    }

    // const validarEmpleado= () => {
    //     const {nombre, password, email, id_rol} = empleado
    //     //todo debe tener contenido
    //     let valido = !nombre.length || !password.length || !email.length || !id_rol.length;
    //     return valido;
    // }

    //enviamos una peticion por axios para actualizar al empleado

    const actualizarEmpleado = async(e) => {
        e.preventDefault();
        const res = await clienteAxios.put(`/empleados/${id_empl}`, empleado)
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
      <h2>Editar Empleado</h2>

      <form
      onSubmit={actualizarEmpleado}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input type="text" placeholder="Nombre Empleado" name="nombre" onChange={actualizarState}
          value={empleado.nombre} />
        </div>

        <div className="campo">
          <label>Password:</label>
          <input type="text" placeholder="Password Empleado" name="password" onChange={actualizarState}
          value={empleado.password} />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Empleado" name="email" onChange={actualizarState}
          value={empleado.email} />
        </div>


        <div className="campo">
          <label>Id-rol:</label>
          <input type="number" placeholder="Id-rol" name="id_rol" onChange={actualizarState}
          value={empleado.id_rol} />
        </div>

        <div className="guardar">
            <Button variant="success">
          <input type="submit" className="btn btn-azul" value="Guargar cambios"
           />
          </Button>
        </div>
      </form>
    </Fragment>
  )
}

export default EditarEmpleado
