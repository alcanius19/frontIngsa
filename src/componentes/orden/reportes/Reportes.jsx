import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useQuery, useMutation } from "@apollo/client";
import { LISTAR_ORDENES } from "../graphql/queries";
import { UPDATE_ORDEN } from "../graphql/mutations";
import { Button } from "reactstrap";
import { FaPencilAlt, FaTable } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Switch from "react-switch";

export default function Reportes() {
  const [estado, setEstado] = useState();
  const [modalEditar, setModalEditar] = React.useState(false);
  const [updateOrden] = useMutation(UPDATE_ORDEN);
  const [datosSelect, setDatosSelect] = useState({
    estado: false,
    fecha_terminacion: "",
    cierre: "",
    fecha_cierre: "",
    vales_alimentacion: "",
    pernoctada: "",
  });
  const { data } = useQuery(LISTAR_ORDENES, {
    fetchPolicy: "no-cache",
  });
  let datos = data?.listarOrden;

  const seleccionDatos = (elemento, caso) => {
    setDatosSelect(elemento);
    caso === "Editar" && setModalEditar(true);
    console.log(elemento);
    setEstado(elemento.estado);
  };

  // obtiene los datos intruducidos en la modal
  const handleChange = (e) => {
    setDatosSelect({
      ...datosSelect,
      [e.target.name]: e.target.value,
    });
    console.log(datosSelect);
  };
  // actualiza el estado del switch
  const handleEstadoChange = () => {
    setEstado(!estado);
  };

  // actualizar Orden de trabajo

  const editarOrden = () => {
    updateOrden({
      variables: {
        _id: datosSelect._id,
        estado: estado,
        fecha_terminacion: datosSelect.fecha_terminacion,
        cierre: datosSelect.cierre,
        fecha_cierre: datosSelect.fecha_cierre,
        vales_alimentacion: datosSelect.vales_alimentacion,
        pernoctada: datosSelect.pernoctada,
      },
    }).then((res) => {
      if (res) {
        Swal.fire("Exitoso!", "Orden Actualizada!", "success").then(() =>
          window.location.reload()
        );
      } else {
        console.log("error");
      }
    });
  };

  const columnas = [
    {
      name: "Action",
      button: true,
      sortable: false,
      // crear el componente y pasarle a la propiedad los datos
      cell: (row) => (
        <>
          <Button color="primary">
            <Link
              to={`/formato_orden/${row._id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <FaTable />
            </Link>
          </Button>
          {"     "}
          <Button color="warning" onClick={() => seleccionDatos(row, "Editar")}>
            <FaPencilAlt />
          </Button>
        </>
      ),
    },
    {
      name: "ID",
      selector: "ordensId",
      sortable: true,
    },
    // {
    //   name: "Orden",
    //   selector: "orden_trabajo",
    //   sortable: true,
    // },
    {
      name: "Estado",
      selector: "estado",
      sortable: true,
      cell: (row) => <h5>{row.estado === true ? "activo" : "inactivo"}</h5>,
    },
    // {
    //   name: "Contrato",
    //   selector: "contrato",
    //   sortable: true,
    // },
    // {
    //   name: "Municipio",
    //   selector: "municipio",
    //   sortable: true,
    // },
    {
      name: "Requerimientos",
      selector: "requerimientos",
      sortable: true,
    },
    {
      name: "Fecha Terminacion",
      selector: "fecha_terminacion",
      sortable: true,
    },
    {
      name: "Cierre",
      selector: "cierre",
      sortable: true,
    },
    {
      name: "Fecha Cierre",
      selector: "fecha_cierre",
      sortable: true,
    },
    {
      name: "Vales alimentacion",
      selector: "vales_alimentacion",
      sortable: true,
    },
    {
      name: "Pernoctada",
      selector: "pernoctada",
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="container mt-4 ">
        <DataTable
          columns={columnas}
          data={datos}
          title="Ordenes de Trabajo"
          responsive={true}
          pagination
        />
      </div>

      <Modal show={modalEditar}>
        <Modal.Header>
          <Modal.Title>Editar Orden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="form-label">Estado</label>
            <Switch
              className="form-control"
              onColor="#2693e6"
              checked={estado}
              onChange={handleEstadoChange}
            />

            {"  "}
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="_id"
              value={datosSelect && datosSelect._id}
              onChange={handleChange}
            />
            <br />

            <label>Fecha Terminacion</label>
            <input
              className="form-control"
              type="datetime-local"
              name="fecha_terminacion"
              value={datosSelect && datosSelect.fecha_terminacion}
              onChange={handleChange}
            />
            <label>Observaciones Cierre</label>
            <textarea
              className="form-control"
              rows="3"
              name="cierre"
              defaultValue={datosSelect && datosSelect.cierre}
              onChange={handleChange}
            ></textarea>

            <label>Fecha Cierre</label>
            <input
              className="form-control"
              type="datetime-local"
              name="fecha_cierre"
              value={datosSelect && datosSelect.fecha_cierre}
              onChange={handleChange}
            />
            <label>Vales Alimentacion</label>
            <input
              className="form-control"
              type="text"
              name="vales_alimentacion"
              value={datosSelect && datosSelect.vales_alimentacion}
              onChange={handleChange}
            />
            <label>Pernoctada</label>
            <input
              className="form-control"
              type="text"
              name="pernoctada"
              value={datosSelect && datosSelect.pernoctada}
              onChange={handleChange}
            />

            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={() => editarOrden()}>
            Editar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
