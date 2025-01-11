import { SubTipoTerceros, TipoDocumento, TipoTercero } from "./tablas-sistema.interface";

export interface Terceros {
    numeroDocumento:                     number;
    tipoDocumento:           TipoDocumento;
    ciudad:                  string;
    pais:                    string;
    fechaNacimiento:         string;
    nombreCompleto:          string;
    genero:                  null | string;
    estadoCivil:             null | string;
    departamento:            null | string;
    codigoPostal:            null;
    tipoTercero:             TipoTercero;
    razonSocial:             null | string;
    subTipoTercero:          SubTipoTerceros;
    clasificacionesFiscales: ClasificacionesFiscales[];
    observaciones:           null | string;
    direccion:               null;
    tercero_id:                      number;
    name:                    string;
    lastName:                string;
    email:                   string;
    phoneNumber:             string;
}

export interface ClasificacionesFiscales {
    clasificacionFiscalId: number;
    codigo:                  string;
    descrip:             string;
    activo:              boolean;
}

