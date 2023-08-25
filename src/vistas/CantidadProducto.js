import React from 'react'

const CantidadProducto = ({producto, restarProducto, sumarProducto, index, eliminarProductoPedido}) => {

  return (
    <li>
            <div className="texto-producto">
              <p className="nombre">{producto.nombre_producto} </p>
              <p className="precio">{producto.precios} </p>
              <p className="precio">{producto.stock} </p>

            </div>
            <div className="acciones">
              <div className="contenedor-cantidad">
                <i className="fas fa-minus" onClick={() => restarProducto(index)} ></i>
                <p className="precio">{producto.cantidad} </p>
                <i className="fas fa-plus" onClick={() => sumarProducto(index)} ></i>
              </div>
              <button type="button" className="btn btn-danger " onClick={() => eliminarProductoPedido(producto.id_prod)} >
                <i className="fas fa-minus-circle"></i>
                Eliminar Producto
              </button>
            </div>
          </li>
  )
}

export default CantidadProducto
