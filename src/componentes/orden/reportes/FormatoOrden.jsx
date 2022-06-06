import React, { useEffect, useState } from "react";
import Firma from "./Firma";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ORDEN_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";
import "./Orden.css";

export default function FormatoOrden(props) {
  const { id } = useParams();
  console.log("parametros: ", id);
  const { data } = useQuery(ORDEN_ID, {
    variables: {
      id,
    },
  });
  let datos = data?.orden_ID;

  // const _exportPdf = () => {
  //   html2canvas(document.querySelector("#capture")).then((canvas) => {
  //     // document.body.appendChild(canvas);
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF('p','pt');
  //     pdf.addImage(imgData, "PNG", -41, 5);
  //     pdf.save("orden.pdf");
  //   });
  // };
  // _exportPdf();

  useEffect(() => {}, []);

  return (
    <div>
      {/* <button className="btn btn-danger p-2" onClick={_exportPdf}>
        PDF
      </button> */}
      <button className="btn  p-2">
        <Link to="/reportes" className="navbar-brand">
          ATRAS
        </Link>
      </button>

      <div id="capture">
        <div className="container-fluid mt-2 ">
          <table className="" style={{ margin: "0 auto" }}>
            <tbody>
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  <h6>FORMATO ORDEN DE TRABAJO</h6>
                </td>
              </tr>
              {/* <tr>
                <td colSpan="3">VERSION 1</td>
                <td colSpan="6">29 agosto 2022</td>
              </tr> */}
              <tr>
                <td>ORDEN DE TRABAJO : {datos?.ordensId} </td>
                <td>
                  ESTADO: {datos?.estado === true ? "activo" : "inactivo"}
                </td>
                <td colSpan="4">MUNICIPIO : {datos?.municipio}</td>
                <td>SECTOR :{datos?.Sector}</td>
              </tr>
              <tr>
                <td colSpan="3">
                  FECHA Y HORA DE ELABORACION: {datos?.fecha_elaboracion}{" "}
                </td>
                <td colSpan="3">
                  FECHA Y HORA DE INICIO: {datos?.fecha_inicio}{" "}
                </td>
                <td colSpan="">
                  FECHA Y HORA DE TERMINACION:{datos?.fecha_terminacion}{" "}
                </td>
              </tr>
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  RESPONSABLE DE LOS TRABAJOS
                </td>
              </tr>
              <tr>
                <td>Cedula: {datos?.cedula}</td>
                <td colSpan="4">Nombre: {datos?.nombre}</td>
                <td>Codigo: {datos?.codigo}</td>

                <td>Cargo: {datos?.cargo}</td>
              </tr>
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  DESCRIPCION
                </td>
              </tr>
              <tr>
                <td colSpan="7" style={{ textAlign: "left" }}>
                  Detalle de los trabajos a realizar:{" "}
                  <textarea
                    className="form-control"
                    rows="3"
                    defaultValue={datos?.detalle_trabajos}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  RECURSOS
                </td>
              </tr>
              <tr>
                <td colSpan="5">Tipo de Vehiculo : {datos?.tipo_vehiculo}</td>
                <td colSpan="2">Placa de Vehiculo : {datos?.placa_vehiculo}</td>
              </tr>
              <tr>
                <td colSpan="">Codigo: {datos?.codigo1}</td>
                <td colSpan="5">Nombre: {datos?.nombre1}</td>
                <td colSpan="1">Cedula: {datos?.cedula1}</td>
              </tr>
              <tr>
                <td colSpan="">Codigo: {datos?.codigo1}</td>
                <td colSpan="5">Nombre: {datos?.nombre1}</td>
                <td colSpan="1">Cedula: {datos?.cedula1}</td>
              </tr>
              <tr>
                <td colSpan="">Codigo: {datos?.codigo1}</td>
                <td colSpan="5">Nombre: {datos?.nombre1}</td>
                <td colSpan="1">Cedula: {datos?.cedula1}</td>
              </tr>
              <tr>
                <td colSpan="">Codigo: {datos?.codigo1}</td>
                <td colSpan="5">Nombre: {datos?.nombre1}</td>
                <td colSpan="1">Cedula: {datos?.cedula1}</td>
              </tr>
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  TRABAJO DE ALTO RIESGO
                </td>
              </tr>
              <tr>
                <td colSpan="7">
                  <ul>
                    <li>{datos?.trabajo}</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", textTransform: "uppercase" }}
                >
                  REQUERIMIENTOS PREOPERACIONALES
                </td>
              </tr>
              <tr>
                <td colSpan="7">
                  <p>
                    El responsable de los trabajos manifiesta que ha
                    inspeccionado y garantiza la utilización de los siguientes
                    elementos de trabajo:
                  </p>
                  <ul>
                    <li>{datos?.requerimientos}</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  RECOMENDACIONES PREOPERACIONALES
                </td>
              </tr>
              <tr>
                <td colSpan="7">
                  <ol>
                    <li>
                      Inspeccionar el lugar a intervenir antes de ejecutar las
                      actividades. .
                    </li>
                    <li>
                      Realizar Inspección del vehiculo antes de salir al sitio
                      asignado para ejecutar las actividades.
                    </li>
                    <li>
                      Dar cumplimiento a la politica de seguridad vial de CINCO
                      LTDA.
                    </li>
                    <li>
                      En caso de hacer uso del transporte publico se debe
                      efectuar con empresas de transporte reconocidas y
                      verificar que los documentos del vehículo se encuentren en
                      completo cumplimiento de las normas legales vigente.
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
                </td>
              </tr>

              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Cierre
                </td>
              </tr>
              <tr>
                <td colSpan="7">
                  <textarea
                    className="form-control"
                    rows="3"
                    defaultValue={datos?.cierre}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td colSpan="5">
                  FECHA Y HORA DE CIERRE: {datos?.fecha_cierre}{" "}
                </td>
                <td>VALES ALIMENTACION: {datos?.vales_alimentacion} </td>
                <td>PERNOCTADA:{datos?.pernoctada} </td>
              </tr>
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  {" "}
                  Responsable de orden de trabajo
                </td>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {" "}
                  Responsable de orden de trabajo
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <Firma />
                  <p>
                    NOMBRE:{" "}
                    {datos?.reponsable_orden[0]?.nombre
                      ? datos?.reponsable_orden[0]?.nombre
                      : "null"}{" "}
                  </p>
                  <p>
                    C.C:{" "}
                    {datos?.reponsable_orden[0]?.cedula
                      ? datos?.reponsable_orden[0]?.cedula
                      : "null"}{" "}
                  </p>
                </td>
                <td colSpan="4">
                  <p>
                    <Firma style={{}} />
                    NOMBRE:{" "}
                    {datos?.responsable_trabajo[0]?.nombre
                      ? datos?.responsable_trabajo[0]?.nombre
                      : "null"}{" "}
                  </p>
                  <p>
                    C.C:{" "}
                    {datos?.responsable_trabajo[0]?.cedula
                      ? datos?.responsable_trabajo[0]?.cedula
                      : "null"}{" "}
                  </p>
                </td>
              </tr>
              {/* <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  {" "}
                  Responsable de los trabajos
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
