import React from "react";
// HashRouter soluciona el error de recargar la pagina
// BrowserRouter modo desarrollo
// HashRouter
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./componentes/comun/Navbar";
import OrdenTrabajo from "./componentes/orden/Orden";
import Reportes from "./componentes/orden/reportes/Reportes";
import FormatoOrden from "./componentes/orden/reportes/FormatoOrden";
import Firma from "./componentes/orden/reportes/Firma";
import Login from "./componentes/login/Login";
import InputDinamico from "./componentes/orden/InputDinamico";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/input"
          element={
            <>
              <InputDinamico />
            </>
          }
        />
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar /> <OrdenTrabajo />
            </>
          }
        />
        <Route
          exact
          path="/reportes"
          element={
            <>
              <Navbar />
              <Reportes />
            </>
          }
        />
        <Route exact path="/formato_orden/:id" element={<FormatoOrden />} />
        <Route exact path="/firma" element={<Firma />} />
        {/* <Route
            exact
            path="/recovery-password"
            element={<RecoveryPassword />}
          />
          <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
