import { gql } from "@apollo/client";

export const LISTAR_ORDENES = gql`
  {
    listarOrden {
      _id
      ordensId
      orden_trabajo
      estado
      contrato
      municipio
      Sector
      fecha_elaboracion
      fecha_terminacion
      cierre
      fecha_cierre
      vales_alimentacion
      pernoctada
      requerimientos
      trabajo
    }
  }
`;

export const ORDEN_ID = gql`
  query OrdenId($id: ID!) {
    orden_ID(_id: $id) {
      ordensId
      orden_trabajo
      estado
      contrato
      municipio
      Sector
      fecha_elaboracion
      fecha_inicio
      fecha_terminacion
      codigo
      nombre
      cedula
      cargo
      detalle_trabajos
      tipo_vehiculo
      placa_vehiculo
      codigo1
      nombre1
      cedula1
      requerimientos
      trabajo
      cierre
      fecha_cierre
      vales_alimentacion
      pernoctada
      reponsable_orden {
        nombre
        cedula
      }
      responsable_trabajo {
        nombre
        cedula
      }
    }
  }
`;
