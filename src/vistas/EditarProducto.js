import React, {useState, Fragment, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router';
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import Spinner from "../componentes/layout/Spinner"


const EditarProducto = () => {

  const navigate = useNavigate()

  // obtener el id_producto
  const {id_prod} = useParams()

  const [producto, setProducto] = useState({
    nombre_producto: "",
    precios: "",
    stock: ""
  })

  //consultar a la api

  const consultarApi = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${id_prod}`)
    console.log(productoConsulta.data.id[0])
    setProducto(productoConsulta.data.id[0])
  }

  useEffect(() => {
    consultarApi()
  },[])

  // console.log(producto.id[0])

    //leer los datos del form
    const informacionProducto = e => {
      setProducto({ ...producto, [e.target.name]: e.target.value })
      console.log(e.target.name)
      console.log(e.target.value)
    };

      // validar los campos
    //   const validarProducto= () => {
    //     const {nombre_producto, precios, stock} = producto
    //     //todo debe tener contenido
    //     let valido = !nombre_producto.length || !precios.length || !stock.length;
    //     return valido;
    // }

    const editarProducto = async(e) => {
      e.preventDefault();
      const res = await clienteAxios.put(`/productos/${id_prod}`, producto)
            .then(res => {
                Swal.fire(
                    'Producto Guardado',
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
            navigate('/productos')
    }

    

    //extraer los valores del state

    const {nombre_producto, precios, stock} = producto;
    console.log(nombre_producto, precios, stock)

    // if(!nombre_producto) return <Spinner/>


  return (
    <Fragment>
    <h2>Editar Producto</h2>

    <form onSubmit={editarProducto}>
      <legend>Llena todos los campos</legend>

      <div className="campo">
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre Producto"
          name="nombre_producto"
          onChange={informacionProducto}
          defaultValue={nombre_producto}
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
          defaultValue={precios}
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
          defaultValue={stock}
        />
      </div>

      <div className="enviar">
        <input
          type="submit"
          className="btn btn-azul"
          value="Agregar Producto"
          
        />
      </div>
    </form>
  </Fragment>
  )
}

export default EditarProducto
