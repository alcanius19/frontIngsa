import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_PERMISO } from "./graphql/mutations";
import { Modal } from "react-bootstrap";
import { LISTAR_PERMISOS } from "./graphql/queries";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";
import { DataContext } from "../context/DataContext";

function VerPermiso() {
  const datosUser = useContext(DataContext);
  const { perfil } = datosUser?.data;
  console.log(
    "🚀 ~ file: VerPermiso.jsx ~ line 17 ~ VerPermiso ~ perfil",
    perfil
  );

  const [updatePermiso] = useMutation(UPDATE_PERMISO);
  const [datosQr, setDatosQr] = useState();
  const [estado, setEstado] = useState();
  const [autorizado, setAutorizado] = useState();
  const [rechazar, setRechazar] = useState(false);
  const [remunerado, setRemunerado] = useState(false);
  const [noRemunerado, setNoRemunerado] = useState(false);

  const [modalEditar, setModalEditar] = React.useState(false);
  const [datosSelect, setDatosSelect] = useState({
    nombres: "",
    autorizado_por: "",
    autorizado: false,
    remunerado: false,
    no_remunerado: false,
    rechazado: false,
  });
  const { data } = useQuery(LISTAR_PERMISOS, {
    fetchPolicy: "no-cache",
  });
  const datos = data?.listarPermisos;

  const seleccionDatos = (elemento, caso) => {
    setDatosSelect(elemento);

    caso === "Editar" && setModalEditar(true);
    console.log("elemento:", elemento);
    setAutorizado(elemento.autorizado);
    setRechazar(elemento.rechazado);
    setRemunerado(elemento.remunerado);
    setNoRemunerado(elemento.no_remunerado);
  };

  const handleChange = (e) => {
    // datosSelect.autorizado = JSON.parse(datosSelect?.autorizado)
    // datosSelect.remunerado = JSON.parse(datosSelect?.remunerado)
    // datosSelect.no_remunerado = JSON.parse(datosSelect?.no_remunerado)
    setDatosSelect({
      ...datosSelect,
      [e.target.name]: e.target.value,
    });
  };

  const editarPermiso = () => {
    updatePermiso({
      variables: {
        _id: datosSelect._id,
        autorizado_por: datosSelect.autorizado_por,
        autorizado: JSON.parse(datosSelect?.autorizado),
        remunerado: JSON.parse(datosSelect?.remunerado),
        no_remunerado: JSON.parse(datosSelect?.no_remunerado),
        rechazado: JSON.parse(datosSelect?.rechazado),
      },
    }).then((res) => {
      if (res) {
        Swal.fire("Exitoso!", "Orden Actualizada!", "success").then(() =>
          setModalEditar(false)
        );
      }
    });
  };

  const Autorizacion = () => (
    <div className="mt-2">
      <div className="col">
        <input
          className="form-control"
          readOnly
          type="hidden"
          name="_id"
          value={datosSelect && datosSelect._id}
          onChange={handleChange}
        />
      </div>
      <div className="col">
        <select
          id="inputState"
          class="form-control"
          onChange={handleChange}
          name="remunerado"
          required
        >
          <option selected>Seleciona una opcion...</option>
          <option value="true">REMUNERADO</option>
          <option value="false">NO REMUNERADO</option>
        </select>
      </div>
      <label for="formGroupExampleInput">Autorizado Por</label>
      <div className="col">
        <input
          type="text"
          class="form-control"
          name="autorizado_por"
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );

  const columns = [
    {
      name: "Action",
      button: true,
      sortable: true,
      cell: (row) => (
        <>
          {perfil === "admin" ? (
            <>
              <Button
                color="primary"
                onClick={() => seleccionDatos(row, "Editar")}
              >
                <FaEye />
              </Button>

              <Button
                color="warning"
                onClick={() => seleccionDatos(row, "Editar")}
              >
                <FaPencilAlt />
              </Button>
            </>
          ) : (
            <Button
              color="primary"
              onClick={() => seleccionDatos(row, "Editar")}
            >
              <FaEye />
            </Button>
          )}
        </>
      ),
    },
    {
      name: "Autorizacion",
      selector: (row) =>
        row.autorizado === false ? "Sin Autorizar" : "Autorizado",
      sortable: true,
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true,
    },
    {
      name: "Fecha Solicitud",
      selector: (row) => row.fecha_solicitud,
      sortable: true,
    },
    {
      name: "Fecha Permiso",
      selector: (row) => row.fecha_permiso,
      sortable: true,
    },
    {
      name: "Clase Diligencia",
      selector: (row) => row.clase_diligencia,
      sortable: true,
      cell: (row) => (
        <span>
          {row.clase_diligencia === "otra" ? row.otro : row.clase_diligencia}
        </span>
      ),
    },
  ];

  useEffect(() => {
    setDatosQr(`
    
      Estado: ${datosSelect.autorizado === true ? "Autorizado" : "Rechazado"}
      
    `);
  }, [datosSelect, data]);
  return (
    <div>
      <div className="container mt-4 ">
        <DataTable
          columns={columns}
          data={datos}
          title="Solicitudes Permiso"
          responsive={true}
          pagination
        />
      </div>
      <Modal show={modalEditar}>
        <Modal.Header>
          <Modal.Title>AUTORIZACION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {perfil === "admin" ? (
            <>
              <div className="row">
                <div className="col">
                  <select
                    id="inputState"
                    class="form-control"
                    onChange={handleChange}
                    name="autorizado"
                  >
                    <option selected>Seleciona una opcion...</option>
                    <option value={true}>AUTORIZAR</option>
                    <option value={false}>RECHAZAR</option>
                  </select>
                </div>
                {datosSelect.autorizado === "true" ? Autorizacion() : null}
              </div>
              <hr />
              <h3>Estado de la Autorizacion</h3>
              <div className="row mt-2">
                <div className="col">
                  <label for="formGroupExampleInput">Nombres y APellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    value={datosSelect && datosSelect.nombres}
                    readOnly
                  />
                </div>
                <div className="col">
                  <label for="formGroupExampleInput">Estado Autorizacion</label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      datosSelect && datosSelect.autorizado == true
                        ? "APROBADO"
                        : "RECHAZADO"
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label for="formGroupExampleInput">Autorizado por:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={datosSelect && datosSelect.autorizado_por}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-4">
                <QRCode
                  value={datosQr}
                  size={256}
                  bgColor="#282c34"
                  fgColor="#fff"
                  level="H"
                  viewBox={`0 0 256 256`}
                />
              </div>
            </>
          ) : (
            <>
              <hr />
              <h3>Estado de la Autorizacion</h3>
              <div className="row mt-2">
                <div className="col">
                  <label for="formGroupExampleInput">Nombres y APellidos</label>
                  <input
                    type="text"
                    className="form-control"
                    value={datosSelect && datosSelect.nombres}
                    readOnly
                  />
                </div>
                <div className="col">
                  <label for="formGroupExampleInput">Estado Autorizacion</label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      datosSelect && datosSelect.autorizado == true
                        ? "APROBADO"
                        : "RECHAZADO"
                    }
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <label for="formGroupExampleInput">Autorizado por:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={datosSelect && datosSelect.autorizado_por}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-4">
                <QRCode
                  value={datosQr}
                  size={256}
                  bgColor="#282c34"
                  fgColor="#fff"
                  level="H"
                  viewBox={`0 0 256 256`}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={() => editarPermiso()}>
            Editar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VerPermiso;
