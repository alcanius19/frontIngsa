import { gql } from "@apollo/client";

export const CREAR_ORDEN = gql`
  mutation addOrden(
    $orden_trabajo: Int
    $estado: Boolean
    $contrato: String
    $municipio: String
    $sector: String
    $fecha_inicio: String
    $fecha_terminacion: String
    $codigo: Int
    $nombre: String
    $cedula: Int
    $cargo: String
    $detalle_trabajos: String
    $tipo_vehiculo: String
    $placa_vehiculo: String
    $recursos: String
    $requerimientos: String
    $trabajo: String
    $cierre: String
    $fecha_cierre: String
    $vales_alimentacion: String
    $pernoctada: String
    $reponsable_orden: [Responsable]
    $responsable_trabajo: [Responsable]
  ) {
    crearOrden(
      input: {
        orden_trabajo: $orden_trabajo
        estado: $estado
        contrato: $contrato
        municipio: $municipio
        Sector: $sector
        fecha_inicio: $fecha_inicio
        fecha_terminacion: $fecha_terminacion
        codigo: $codigo
        nombre: $nombre
        cedula: $cedula
        cargo: $cargo
        detalle_trabajos: $detalle_trabajos
        tipo_vehiculo: $tipo_vehiculo
        placa_vehiculo: $placa_vehiculo
        recursos: $recursos
        requerimientos: $requerimientos
        trabajo: $trabajo
        cierre: $cierre
        fecha_cierre: $fecha_cierre
        vales_alimentacion: $vales_alimentacion
        pernoctada: $pernoctada
        reponsable_orden: $reponsable_orden
        responsable_trabajo: $responsable_trabajo
      }
    ) {
      orden_trabajo
      contrato
      estado
      recursos
    }
  }
  
`;

 export const UPDATE_ORDEN = gql`
   mutation updateOrden(
     $_id: ID!
     $estado: Boolean
     $fecha_terminacion: String
     $cierre: String
     $detalle_trabajos: String
     $fecha_cierre: String
     $vales_alimentacion: String
     $pernoctada: String
   ) {
     actualizarOrden(
       _id: $_id
       input: {
         estado: $estado
         fecha_terminacion: $fecha_terminacion
         cierre: $cierre
         detalle_trabajos: $detalle_trabajos
         fecha_cierre: $fecha_cierre
         vales_alimentacion: $vales_alimentacion
         pernoctada: $pernoctada
       }
     ) {
       estado
     }
   }
 `;
