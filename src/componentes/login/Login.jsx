import React, { useContext, useState } from "react";
import estilos from "./login.module.css";
import Form from "react-bootstrap/Form";

import { EmpleadosLogin } from "../../data/empleadosLogin";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [datos, setDatos] = useState({
    cedula: 0,
    codigo: 0,
    nombre: "",
    cargo: "",
    estado: "",
  });
  const { setData } = useContext(DataContext);
  const navegar = useNavigate();
  const { empleados } = EmpleadosLogin;

  function validateForm() {
    return datos.cedula.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleInput(event) {
    let value = event.target.value;

    empleados.filter((v) => {
      if (value === v.cedula) {
        alert(`"bienvenid@", ${v.nombres}`);
        datos.codigo = v.codigo;
        datos.cargo = v.cargo;
        datos.nombre = v.nombres;
        datos.estado = true;
      } else {
      }
    });
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  }

  const handleLogin = () => {
    if (datos.estado) {
      setData(datos);
      navegar("/");
    } else {
      alert("Error el ingresar");
    }
  };

  return (
    <div className={estilos.cuerpo}>
      <div className={estilos.App}>
      <Form onSubmit={handleSubmit}>
        <div className={estilos.input_container}>
        <input type="text" className="form-control " placeholder="  Username" value={"  " + datos.nombre} readOnly/>
        <i className="zmdi zmdi-account zmdi-hc-lg"></i>
      </div>

        <div className={estilos.input_container}>
          <input type="password" className="form-control"  name="cedula" placeholder="  Cedula" onChange={handleInput} />
          <i className="zmdi zmdi-lock zmdi-hc-sm p-0"></i>
        </div>

        <button
            className="btn btn-dark"
            block="true"
            type="submit"
            onClick={handleLogin}
            disabled={!validateForm()}
          >
            Login
          </button>
      </Form>
      </div>
    </div>
  );
}
