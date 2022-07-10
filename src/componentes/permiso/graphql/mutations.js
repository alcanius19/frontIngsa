import { gql } from "@apollo/client";


export const CREAR_PERMISO = gql` mutation addPermiso(
    $nombres: String
    $cedula:Int
    $contrato:String
    $cargo:String
    $municipio: String
    $fecha_solicitud:String
    $fecha_permiso:String
    $hora_desde:String
    $hora_hasta:String
    $clase_diligencia:String
    $otro: String
    $firma_solicitante: String
    $autorizado_por:String
    $autorizado: Boolean
    $rechazado: Boolean
    $remunerado: Boolean
    $no_remunerado:Boolean
) {
  crearPermiso(input:{
    nombres: $nombres,
    cedula: $cedula,
    contrato: $contrato,
    cargo : $cargo,
    municipio:$municipio,
    fecha_solicitud: $fecha_solicitud,
    fecha_permiso: $fecha_permiso,
    hora_desde: $hora_desde,
    hora_hasta: $hora_hasta,
    clase_diligencia:$clase_diligencia,
    otro: $otro,
    firma_solicitante:$firma_solicitante,
    autorizado_por:$autorizado_por,
    autorizado: $autorizado,
    rechazado: $rechazado,
    remunerado: $remunerado,
    no_remunerado: $no_remunerado,
  }){
    nombres
    cedula
    contrato
    cargo
    municipio
    fecha_solicitud
    fecha_permiso
    hora_desde
    hora_hasta
    clase_diligencia
    otro
    firma_solicitante
    autorizado_por
    autorizado
    rechazado
    remunerado
    no_remunerado
  }
   }
`;

export const UPDATE_PERMISO = gql`
mutation updatePermiso(
  $_id: ID!
  $autorizado: Boolean
  $remunerado: Boolean,
  $no_remunerado: Boolean,
  $autorizado_por : String
  $rechazado: Boolean,
){
 ActualizarPermiso(_id: $_id input:{
    autorizado_por: $autorizado_por,
    autorizado: $autorizado,
    remunerado: $remunerado,
    no_remunerado: $no_remunerado,
    rechazado: $rechazado,
 }){
   nombres
 }
}
`;