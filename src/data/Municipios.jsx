import React, { useState } from "react";

function Municipios({ handleInput }) {
  const [municipios, setMunicipios] = useState();

  const endPoint =
    "https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=Huila";

  let datos = [];
  fetch(endPoint)
    .then((response) => response.json())
    .then((showData) => {
      for (let index = 0; index < showData?.length; index++) {
        datos.push(showData[index]);
        // console.log(showData[index]);
      }
      setMunicipios(datos);
    });
  return (
    <div>
      <select
        className="form-control"
        placeholder="Municipio"
        name="municipio"
        onChange={handleInput}
      >
        {municipios?.map((option) => (
          <option value={option?.municipio}>{option?.municipio}</option>
        ))}
      </select>
    </div>
  );
}

export default Municipios;
