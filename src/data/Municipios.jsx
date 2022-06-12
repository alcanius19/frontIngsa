import React, { useEffect, useState } from "react";

function Municipios({ handleInput }) {
  const [municipios, setMunicipios] = useState();

  const endPoint =
    "https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=Huila";

  const getMunicipios = async ()=>{
  let datos = [];
  await fetch(endPoint)
    .then((response) =>  response.json())
    .then((showData) => {
      for (let index = 0; index < showData?.length; index++) {
        datos.push(showData[index]);
        // console.log(showData[index]);
      }
      setMunicipios(datos);
    });
  }
  useEffect(()=>{
   getMunicipios()
  },[])
  return (
    <div>
      <select
        className="form-control"
        placeholder="Municipio"
        name="municipio"
        onChange={handleInput}
      >
        <option value="none" selected disabled hidden>Seleccione una Opcion</option>
        {municipios?.map((option,i) => (
          <option value={option?.municipio} key={i}>{option?.municipio}</option>
        ))}
      </select>
    </div>
  );
}

export default Municipios;
