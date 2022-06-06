import React from "react";

export default function Responsable({ handleInput }) {
  return (
    <div>
      <div className="row p-0 justify-content-center">
        <div className="col-auto p-1">
          <label  className="form-label">
            Cedula
          </label>
          <input
            type="number"
            name="cedula"
            className="form-control"
            placeholder="Cedula"
            onChange={handleInput}
          />
        </div>
        <div className="col-auto p-1">
          <label  className="form-label">
            Codigo
          </label>
          <input
            type="number"
            name="codigo"
            id="codigo"
            className="form-control"
            placeholder="Codigo"
            onChange={handleInput}
            readOnly
          />
        </div>

        <div className="col-auto p-1">
          <label  className="form-label">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre"
            onChange={handleInput}
            readOnly
          />
        </div>

        <div className="col-auto p-1">
          <label  className="form-label">
            Cargo
          </label>
          <input
            type="text"
            name="cargo"
            className="form-control"
            placeholder="Cargo"
            onChange={handleInput}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
