import React, { createContext, useState } from "react";

export const DataContext = createContext();

const datosGlobales = {
  cedula: 0,
  codigo: 0,
  nombre: "",
  cargo: "",
  estado: false,
  perfil:""
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(datosGlobales);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
