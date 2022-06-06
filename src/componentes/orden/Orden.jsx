import React, { useState, useContext } from "react";
import Responsable from "./Responsable";
import Recursos from "./Recursos";
import PropTypes from "prop-types";
import Select from "react-select";
import Switch from "react-switch";
import { Elementos } from "../../data/data";
import Municipios from "../../data/Municipios";
import { useMutation } from "@apollo/client";
import { CREAR_ORDEN } from "./graphql/mutations";
import { Empleados } from "../../data/empleados";
import Swal from "sweetalert2";
import { DataContext } from "../context/DataContext";

function OrdenTrabajo() {
  const { data } = useContext(DataContext);
 
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectTrabajo, setSelectTrabajo] = useState(null);
  const [crearOrden] = useMutation(CREAR_ORDEN);
  const [estado, setEstado] = useState(false);
  const [datos, setDatos] = useState({
    orden_trabajo: PropTypes.number,
    estado: true,
    contrato: "",
    municipio: "",
    sector: "",
    fecha_elaboracion: "",
    fecha_inicio: "",
    fecha_terminacion: "",
    codigo: "",
    nombre: "",
    cedula: "",
    cargo: "",
    detalle_trabajos: "",
    tipo_vehiculo: "",
    placa_vehiculo: "",
    codigo1: "",
    nombre1: "",
    cedula1: "",
    requerimientos: "",
    trabajo_altura: false,
    trabajo_caliente: false,
    espacios_confinados: false,
    trabajo_electrico: false,
    izaje_cargas: false,
    excavaciones: false,
    manipulacion_explosivos: false,
    transito: false,
    trabajo: "",
    cierre: "",
    fecha_cierre: "",
    vales_alimentacion: "",
    pernoctada: "",
    nombre_resp_ord: "",
    cedula1: 0,
    nombre_resp_trab: "",
    cedula2: 0,
  });

  // guardo los datos del select y luego los paso a string para guardarlos
  const recorrerDatos = () => {
    let data = [];
    for (let index = 0; index < selectedOption?.length; index++) {
      const element = selectedOption[index].value;
      data.push(element);
    }
    return data;
  };

  // guardo los datos del select y luego los paso a string para guardarlos
  const datosTrabajo = () => {
    let data = [];
    for (let index = 0; index < selectTrabajo?.length; index++) {
      const element = selectTrabajo[index].value;
      data.push(element);
    }
    return data;
  };
  datos.requerimientos = recorrerDatos().toString();
  datos.trabajo = datosTrabajo().toString();

  const handleInpuChange = (event) => {
    let value = event.target.value;
    let codigo = document.getElementsByTagName("input")[7];
    let nombre = document.getElementsByTagName("input")[8];
    let cargo = document.getElementsByTagName("input")[9];
    let resp_trabajos = document.getElementsByTagName("input")[21];
    let resp_trab_ced = document.getElementsByTagName("input")[22];
    console.log(resp_trabajos);
    const { empleados } = Empleados;
    for (let index = 0; index < empleados.length; index++) {
      const element = empleados[index].cedula;

      if (value === element) {
        datos.codigo = empleados[index].codigo;
        datos.nombre = empleados[index].nombres;
        datos.cargo = empleados[index].cargo;
        codigo.value = empleados[index].codigo;
        nombre.value = empleados[index].nombres;
        cargo.value = empleados[index].cargo;
        datos.nombre_resp_trab = empleados[index].nombres;
        datos.cedula2 = empleados[index].cedula;
        resp_trabajos.value = empleados[index].nombres;
        resp_trab_ced.value = empleados[index].cedula;
      } else {
      }
    }
    console.log(event);
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };
  const handleEstadoChange = () => {
    setEstado(!estado);
  };

  // CREAR ORDEN

  const enviarDatos = (event) => {
    event.preventDefault();

    console.log(datos);
    crearOrden({
      variables: {
        orden_trabajo: parseInt(datos.orden_trabajo),
        estado,
        contrato: datos.contrato,
        municipio: datos.municipio,
        sector: datos.sector,
        fecha_elaboracion: datos.fecha_elaboracion,
        fecha_inicio: datos.fecha_inicio,
        fecha_terminacion: datos.fecha_terminacion,
        codigo: parseInt(datos.codigo),
        nombre: datos.nombre,
        cedula: parseInt(datos.cedula),
        cargo: datos.cargo,
        detalle_trabajos: datos.detalle_trabajos,
        tipo_vehiculo: datos.tipo_vehiculo,
        placa_vehiculo: datos.placa_vehiculo,
        requerimientos: datos.requerimientos,
        trabajo: datos.trabajo,
        cierre: datos.cierre,
        fecha_cierre: datos.fecha_cierre,
        vales_alimentacion: datos.vales_alimentacion,
        pernoctada: datos.pernoctada,
        reponsable_orden: {
          nombre: datos.nombre_resp_ord,
          cedula: parseInt(datos.cedula1),
        },
        responsable_trabajo: {
          nombre: datos.nombre_resp_trab,
          cedula: parseInt(datos.cedula2),
        },
      },
    }).then((res) => {
      Swal.fire("Success!", "Datos Guardados!", "success");
    });
  };

  return (
    <div>
      <form onSubmit={enviarDatos}>
        <div className="container border border-primary mt-4 mb-4 ">
          <h1 className="text-center mt-4">Formato Orden de Trabajo</h1>
          <div className="row p-2 justify-content-center">
            <div className="col-sm-2 p-1"></div>

            <label className="form-label">Estado</label>
            <Switch
              onColor="#2693e6"
              checked={estado}
              onChange={handleEstadoChange}
            />

            <div className="col-auto p-1">
              <label className="form-label">Contrato</label>
              <input
                type="text"
                name="contrato"
                className="form-control"
                placeholder="Contrato"
                onChange={handleInpuChange}
              />
            </div>
            <div className="col-auto p-1">
              <label className="form-label">Municipio</label>
              <Municipios handleInput={handleInpuChange} />
              {/* <input
                type="text"
                name="municipio"
                className="form-control"
                placeholder="Municipio"
                onChange={handleInpuChange}
              /> */}
            </div>
            <div className="col-auto p-1">
              <label className="form-label">Sector</label>
              <select
                className="form-control"
                placeholder="Sector"
                name="sector"
                onChange={handleInpuChange}
              >
                <option value="URBANO">Urbano</option>
                <option value="RURAL">Rural</option>
              </select>
            </div>
          </div>

          <div className="row p-0 justify-content-center">
            {/* <div className="col-auto p-1">
              <label className="form-label">Fecha y hora de elaboración</label>
              <input
                type="datetime-local"
                name="fecha_elaboracion"
                className="form-control"
                placeholder="Fecha y hora de elaboración:"
                onChange={handleInpuChange}
              />
            </div> */}

            <div className="col-auto p-0"></div>

            <div className="col-auto p-1">
              <label className="form-label">Fecha y hora de inicio</label>
              <input
                type="datetime-local"
                name="fecha_inicio"
                className="form-control"
                placeholder="Fecha y hora de inicio:"
                onChange={handleInpuChange}
              />
            </div>
            <div className="col-auto p-1">
              <label className="form-label">Fecha y hora de terminación</label>
              <input
                type="datetime-local"
                name="fecha_terminacion"
                className="form-control"
                placeholder="Fecha y hora de terminación :"
                onChange={handleInpuChange}
              />
            </div>
          </div>
          <hr />
          <h6 className="text-center">Responsable de los Trabajos</h6>
          {/* ir al componente y add para buscar por cedula */}
          <Responsable handleInput={handleInpuChange} />
          <hr />
          <h6 className="text-center">Descripcion</h6>
          <div className="col">
            <textarea
              className="form-control"
              rows="3"
              name="detalle_trabajos"
              onChange={handleInpuChange}
              defaultValue="Descripcion."
            ></textarea>
          </div>

          <hr />
          <Recursos recurso={handleInpuChange} />
          <hr />
          <h6 className="text-center">Trabajo de alto riesgo</h6>

          <Select
            isMulti
            name=""
            defaultValue={selectTrabajo}
            onChange={setSelectTrabajo}
            options={Elementos.trabajo}
            className="basic-multi-select"
            classNamePrefix="select"
          />

          <hr />
          <h6 className="text-center">Requerimientos Preoperacionales</h6>
          <Select
            isMulti
            name=""
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={Elementos.items}
            className="basic-multi-select"
            classNamePrefix="select"
          />

          <span>
            El responsable de los trabajos manifiesta que ha inspeccionado y
            garantiza la utilización de los siguientes elementos de trabajo:
          </span>

          <h6 className="text-center">Recomendaciones Preoperacionales</h6>

          <ol>
            <li>
              Inspeccionar el lugar a intervenir antes de ejecutar las
              actividades. .
            </li>
            <li>
              Realizar Inspección del vehiculo antes de salir al sitio asignado
              para ejecutar las actividades.
            </li>
            <li>
              Dar cumplimiento a la politica de seguridad vial de CINCO LTDA.
            </li>
            <li>
              En caso de hacer uso del transporte publico se debe efectuar con
              empresas de transporte reconocidas y verificar que los documentos
              del vehículo se encuentren en completo cumplimiento de las normas
              legales vigente.
            </li>
            <li>
              Inspeccionar el lugar a intervenir antes de ejecutar las
              actividades.
            </li>
            <li>
              Inspeccionar el lugar a intervenir antes de ejecutar las
              actividades.
            </li>
          </ol>
          <hr />
          <h6 className="text-center">Cierre</h6>
          <div className="col">
            <textarea
              className="form-control"
              rows="3"
              name="cierre"
              defaultValue="Observaciones:"
              onChange={handleInpuChange}
            ></textarea>
          </div>

          <div className="row p-0 justify-content-center">
            <div className="col-auto p-1">
              <label className="form-label">Fecha y Hora Cierre</label>
              <input
                type="datetime-local"
                name="fecha_cierre"
                className="form-control"
                placeholder="Fecha y Hora Cierre"
                onChange={handleInpuChange}
              />
            </div>

            <div className="col-auto p-1">
              <label className="form-label">Vales de alimentacion</label>
              <input
                type="text"
                name="vales_alimentacion"
                className="form-control"
                placeholder="Vales de alimentacion"
                onChange={handleInpuChange}
              />
            </div>
            <div className="col-auto p-1">
              <label className="form-label">Pernoctada</label>
              <input
                type="text"
                name="pernoctada"
                className="form-control"
                placeholder="Pernoctada"
                onChange={handleInpuChange}
              />
            </div>
          </div>

          <table className="table table-bordered mt-4">
            <thead>
              <tr>
                <th>Responsable de orden de trabajo</th>
                <th>Responsable de los trabajos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre_resp_ord"
                    id=""
                    onChange={handleInpuChange}
                  />
                  <label className="form-label">Cedula</label>
                  <input
                    type="number"
                    className="form-control"
                    name="cedula1"
                    id=""
                    onChange={handleInpuChange}
                  />
                </td>
                <td>
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre_resp_trab"
                    id=""
                    onChange={handleInpuChange}
                    readOnly
                  />
                  <label className="form-label">Cedula</label>
                  <input
                    type="number"
                    className="form-control"
                    name="cedula2"
                    id=""
                    onChange={handleInpuChange}
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <input className="btn btn-primary" type="submit" value="Guardar" />
          {/* <a href="02092019.pdf" className="btn btn-warning">
            DESCARGAR
          </a> */}
        </div>
      </form>
    </div>
  );
}

export default OrdenTrabajo;
