import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {EmpleadosLogin} from "../../data/empleadosLogin"
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [datos,setDatos] = useState({
    cedula:0,
    codigo:0,
    nombre:"",
    cargo: "",
    estado:""
    
  })
  const {setData} = useContext(DataContext)
   const navegar = useNavigate();
  const {empleados} = EmpleadosLogin

  function validateForm() {
    return datos.cedula.length > 0;
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    
  }

  function handleInput(event){
   let value = event.target.value;
   
   empleados.map((v)=>{
     if (value === v.cedula) {
       alert(`"bienvenid@", ${v.nombres}`)
       datos.codigo = v.codigo
       datos.cargo = v.cargo
       datos.nombre = v.nombres
       datos.estado = true
     }else{
      

     }
   })
   setDatos({
     ...datos,
     [event.target.name]: event.target.value,
   })
  }

  const handleLogin = ()=>{
    if (datos.estado) {
      setData(datos)
      navegar("/")
    }else{
      alert("Error el ingresar")
    }
       

  }
 
  return (
    
      <div className="container-sm mt-4" style={{margin: "0 auto", width:"200px"}}>
        <Form onSubmit={handleSubmit}>
          <Form.Group >
            <Form.Label>Cedula</Form.Label>
            <Form.Control
              className="form-control"
              autoFocus
              type="number"
              name="cedula"
              onChange={handleInput}
            />
          </Form.Group>
          {/* <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="codigo"
              onChange={handleInput}
            />
          </Form.Group> */}
          <Button
            className="btn btn-primary mt-4"
            block="true"
            type="submit"
            onClick={handleLogin}
            disabled={!validateForm()}
          >
            Login
          </Button>
        </Form>
      </div>
    
  );
}
