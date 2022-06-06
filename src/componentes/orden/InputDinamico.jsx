import React, { useState } from "react";
import { Empleados } from "../../data/empleados";


function InputDinamico() {
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
 
  return (
    <div>
      {" "}
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              name="cedula"
              placeholder="Cedula"
              type="number"
              value={x.cedula}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="codigo"
              placeholder="Codigo"
              value={x.codigo}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="nombre"
              placeholder="Nombre"
              value={x.nombre}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default InputDinamico;
