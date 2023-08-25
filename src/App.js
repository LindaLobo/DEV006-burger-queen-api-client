import Navigation from "./componentes/Navigation.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./routes/Login";
import { AuthProvider } from "./context/AuthProvider";
import { Fragment } from "react";
import Lateral from "./componentes/Lateral.js";
import Empleados from "./routes/Empleados"
import NuevoEmpleado from "./vistas/NuevoEmpleado.js";
import EditarEmpleado from "./vistas/EditarEmpleado.js";
import Productos from "./routes/Productos";
import EditarProducto from "./vistas/EditarProducto.js";
import NuevoProducto from "./vistas/NuevoProducto.js";
import Menu from "./routes/Menu";
import NuevaOrden from "./vistas/NuevaOrden.js";
import Cocina from "./routes/Cocina.jsx";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
          <div className="row">
            <div className="col-md-3">
              <Lateral />
            </div>
            <div className="col-md-9">
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/menu" element={<Menu />}></Route>
                <Route path="/menu/nuevo" element={<NuevaOrden />}></Route>
                <Route path="/empleados" element={<Empleados />}></Route>
                <Route path="/empleados/nuevo" element={<NuevoEmpleado />}></Route>
                <Route path="/empleados/editar/:id_empl" element={<EditarEmpleado  />}></Route>
                <Route path="/productos" element={<Productos />}></Route>
                <Route path="/productos/nuevo" element={<NuevoProducto />}></Route>
                <Route path="/productos/editar/:id_prod" element={<EditarProducto />}></Route>
                <Route path="/cocina" element={<Cocina />}></Route>
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
