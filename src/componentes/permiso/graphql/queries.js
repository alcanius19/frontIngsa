import { gql } from "@apollo/client";


export const LISTAR_PERMISOS = gql`
{
    listarPermisos{
      _id
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