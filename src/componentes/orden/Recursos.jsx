import React, {useEffect, useState} from "react";
import { Empleados } from "../../data/empleados";


export const  Recursos = ({ recurso })=> {

  const [inputList, setInputList] = useState([
    { cedula: 0, codigo: 0, nombre: "" },
  ]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;

    const empleados = [{ ...Empleados }];

    empleados[0].empleados.map((value) => {
      if (parseInt(list[index].cedula) === parseInt(value?.cedula)) {
        list[index].nombre = value?.nombres;
        list[index].codigo = value?.codigo;
      }
    });
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { cedula: "", codigo: "", nombre: "" }]);
  };

  function validateForm() {
    console.log("cantidad" ,inputList.length)
    return inputList[0].cedula > 0;
  }
  localStorage.setItem("userRecurso", JSON.stringify(inputList))

  useEffect(()=>{
    localStorage.setItem("userRecurso", JSON.stringify(inputList))
  })
  return (
    <div>
      <h6 className="text-center">Recursos</h6>
      <div className="row p-0 justify-content-center">
        <div className="col-sm-3 p-1">
          <select
            className="form-control"
            name="tipo_vehiculo"
            onChange={recurso}
          >
            <option>Tipo de vehiculo</option>
            <option value="moto">Motocicleta</option>
            <option value="moto">Camioneta</option>
          </select>
        </div>
        <div className="col-sm-3 p-1">
          <input
            type="text"
            name="placa_vehiculo"
            className="form-control"
            placeholder="Placa Vehiculo"
            onChange={recurso}
          />
        </div>
       
      </div>
      {" "}
      {inputList.map((x, i) => {
        return (
          <div className="row p-0 justify-content-center">
           <div className="col-sm-3 p-1">
            <input
              name="cedula"
              placeholder="Cedula"
              className="form-control"
              type="number"
              value={x.cedula}
              onChange={(e) => handleInputChange(e, i)}
            />
           </div>
           <div className="col-sm-3 p-1">
            <input
              className="form-control"
              name="codigo"
              placeholder="Codigo"
              value={x.codigo}
              onChange={(e) => handleInputChange(e, i)}
              readOnly
            />
            </div>
            <div className="col-sm-3 p-1">
            <input
              className="form-control"
              name="nombre"
              placeholder="Nombre"
              value={x.nombre}
              onChange={(e) => handleInputChange(e, i)}
              readOnly
            />
            </div>
            <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="btn btn-danger" type="button" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button className="btn btn-primary m-4" onClick={handleAddClick} disabled={!validateForm()}>Add</button>
              )}
            </div>
          </div>
          
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
      
    </div>
  );
}

