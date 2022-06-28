import React, { Fragment, useContext } from "react";
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
import ProtectedRoute from "./componentes/login/ProtectedRoute";
import { DataContext } from "./componentes/context/DataContext";

function App() {
  const {data} = useContext(DataContext)
  return (
    <Router>
      <Fragment>
      <Routes> 
      <Route
          exact
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
       <Route path="/" element={<ProtectedRoute />}>
          <Route exact path='/' element={<>
              <Navbar /> <OrdenTrabajo />
            </>} />
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
          
        </Route>
        {/* <Route
          exact
          path="/reportes"
          element={
            <>
              <Navbar />
              <Reportes />
            </>
          }
          
        />
        <Route
          exact
          path="/orden"
          element={
            <>
              <Navbar /> <OrdenTrabajo />
            </>
          }
        /> 
         <Route exact path="/formato_orden/:id" element={<FormatoOrden />} />
        <Route
          exact
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />
         <Route
          exact
          path="/orden"
          element={
            <>
              <Navbar /> <OrdenTrabajo />
            </>
          }
        /> 
       
        
        
        <Route exact path="/formato_orden/:id" element={<FormatoOrden />} />
        <Route exact path="/firma" element={<Firma />} /> */}
         {/* <Route
            exact
            path="/recovery-password"
            element={<RecoveryPassword />}
          />
          <Route path="*" element={<NotFound />} />  */}
      </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
