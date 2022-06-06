import React from "react";

export default function Recursos({ recurso }) {
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
        {/* <div className="col-sm-1 p-1">
              <input
                type="button"
                name=""
                className="btn btn-primary"
                value="Add +"
                id="add"
                onClick="myFunction()"
              />
            </div> */}
      </div>
      <div id="operario">
        <div className="row p-0 justify-content-center">
          <div className="col-sm-3 p-1">
            <input
              type="text"
              name="codigo1"
              className="form-control"
              placeholder="Codigo"
              onChange={recurso}
            />
          </div>

          <div className="col-sm-3 p-1">
            <input
              type="text"
              name="nombre1"
              className="form-control"
              placeholder="Nombre"
              onChange={recurso}
            />
          </div>
          <div className="col-sm-3 p-1">
            <input
              type="number"
              name="cedula1"
              className="form-control"
              placeholder="Cedula"
              onChange={recurso}
            />
          </div>
        </div>
        {/* <div className="row p-0 justify-content-center">
              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Codigo"
                />
              </div>

              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Nombre"
                />
              </div>
              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Cedula"
                />
              </div>
            </div> */}
        {/* <div className="row p-0 justify-content-center">
              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Codigo"
                />
              </div>

              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Nombre"
                />
              </div>
              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Cedula"
                />
              </div>
            </div> */}
        {/* <div className="row p-0 justify-content-center">
              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Codigo"
                />
              </div>

              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Nombre"
                />
              </div>
              <div className="col-sm-3 p-1">
                <input
                  type="text"
                  name=""
                  className="form-control"
                  placeholder="Cedula"
                />
              </div>
            </div> */}
      </div>
    </div>
  );
}
