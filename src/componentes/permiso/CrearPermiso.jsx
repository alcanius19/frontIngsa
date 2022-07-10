import React from "react";
import moment from "moment";
import "moment/locale/es";
import "moment-timezone";
import { useMutation } from "@apollo/client";
import { CREAR_PERMISO } from "./graphql/mutations";
import { Empleados } from "../../data/empleados";
import Municipios from "../../data/Municipios";
import Swal from "sweetalert2";
function CrearPermiso() {
  const [show, setShowResultado] = React.useState();
  const fecha_solicitud = moment().format("MMMM Do YYYY", "America/Bogota");
  const [crearPermiso] = useMutation(CREAR_PERMISO);
  const [datos, setDatos] = React.useState({
    nombres: "",
    cedula: 0,
    contrato: "",
    cargo: "",
    municipio: "",
    fecha_solicitud: "",
    fecha_permiso: "",
    hora_desde: "",
    hora_hasta: "",
    clase_diligencia: "",
    otro: "",
    firma_solicitante: "",
    autorizado_por: "",
    rechazado: false,
    remunerado: false,
    no_remunerado: false,
  });

  const handleInputChange = (event) => {
    const value = event.target.value;

    let nombres = document.getElementsByName("nombres")[0];
    let cargo = document.getElementsByName("cargo")[0];
    let contrato = document.getElementsByName("contrato")[0];
    let selectDiligencia = document.getElementsByName("clase_diligencia")[0];
    let firma_solicitante = document.getElementsByName("firma_solicitante")[0];
    setShowResultado(selectDiligencia.value);
    datos.fecha_solicitud = fecha_solicitud;
    const { empleados } = Empleados;
    for (let index = 0; index < empleados.length; index++) {
      const element = empleados[index].cedula;
      if (value === element) {
        datos.cargo = empleados[index].cargo;
        datos.nombres = empleados[index].nombres;
        datos.contrato = empleados[index].contrato;
        datos.firma_solicitante = empleados[index].nombres;
        nombres.value = empleados[index].nombres;
        cargo.value = empleados[index].cargo;
        contrato.value = empleados[index].contrato;
        firma_solicitante.value = empleados[index].nombres;
      }
    }

    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
    console.log(datos);
  };

  const enviarDatos = (e) => {
    e.preventDefault();

    crearPermiso({
      variables: {
        nombres: datos.nombres,
        cedula: parseInt(datos.cedula),
        contrato: datos.contrato,
        cargo: datos.cargo,
        municipio: datos.municipio,
        fecha_solicitud: datos.fecha_solicitud,
        fecha_permiso: datos.fecha_permiso,
        hora_desde: datos.hora_desde,
        hora_hasta: datos.hora_hasta,
        clase_diligencia: datos.clase_diligencia,
        otro: datos.otro,
        firma_solicitante: datos.firma_solicitante,
        autorizado_por: "",
        autorizado: false,
        rechazado: false,
        remunerado: false,
        no_remunerado: false,
      },
    }).then((res)=>{
      Swal.fire("Procesado!", "Solicitud Enviada!", "success");
    });
  };

  const Resultado = () => (
    <div class="col">
      <label for="formGroupExampleInput">CUAL?</label>
      <input
        type="text"
        class="form-control"
        name="otro"
        onChange={handleInputChange}
      />
    </div>
  );

  return (
    <div>
      <h1>CREAR PERMISO</h1>
      <div className="container mt-4">
        <form onSubmit={enviarDatos}>
          <div class="row">
            <div class="col">
              <label for="formGroupExampleInput">Cedula No.</label>
              <input
                type="number"
                class="form-control"
                name="cedula"
                onChange={handleInputChange}
              />
            </div>
            <div class="col">
              <label for="formGroupExampleInput">Nombres y APellidos</label>
              <input type="text" class="form-control" name="nombres" readOnly />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="formGroupExampleInput">Contrato/Area</label>
              <input
                type="text"
                class="form-control"
                name="contrato"
                readOnly
              />
            </div>
            <div class="col">
              <label for="formGroupExampleInput">Cargo</label>
              <input type="text" class="form-control" name="cargo" readOnly />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="formGroupExampleInput">Municipio</label>
              <Municipios handleInput={handleInputChange} />
            </div>
            <div class="col">
              <label for="formGroupExampleInput">Fecha Solicitud Permiso</label>
              <input class="form-control" value={fecha_solicitud} readOnly />
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="formGroupExampleInput">Fecha Permiso</label>
              <input
                type="date"
                class="form-control"
                name="fecha_permiso"
                onChange={handleInputChange}
              />
            </div>
            <div class="col">
              <label for="formGroupExampleInput">Hora Desde</label>
              <input
                type="time"
                class="form-control"
                name="hora_desde"
                onChange={handleInputChange}
              />
            </div>
            <div class="col">
              <label for="formGroupExampleInput">Hora Hasta</label>
              <input
                type="time"
                class="form-control"
                name="hora_hasta"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <label for="formGroupExampleInput">Clase de Diligencia</label>
              <select
                id="inputState"
                class="form-control"
                onChange={handleInputChange}
                name="clase_diligencia"
              >
                <option selected>Seleciona una opcion...</option>
                <option value="medica">MEDICA</option>
                <option value="oficial">OFICIAL</option>
                <option value="particular">PARTICULAR</option>
                <option value="otra">OTRO</option>
              </select>
            </div>
            {show === "otra" ? Resultado() : null}
          </div>

          <div class="row">
            <div class="col">
              <label for="formGroupExampleInput">Firma del Solicitante</label>
              <input
                type="text"
                class="form-control"
                name="firma_solicitante"
                readOnly
              />
            </div>
            <div class="col">
              <label for="formGroupExampleInput">Autorizado Por</label>
              <input type="text" class="form-control" readOnly />
            </div>
            <div class="col">
              <label for="formGroupExampleInput">VoBo Talento Humano</label>
              <input type="text" class="form-control" readOnly />
            </div>
          </div>
          <br />
          <div>
            <button className="btn btn-primary">Enviar Solicitud</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearPermiso;
