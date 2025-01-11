export interface TipoDocumento {
    tipoDocumentoId: number;
    codigo:          string;
    descrip:         string;
}


export interface TipoTercero {
    tipoTerceroId: number;
    codigo:        string;
    descrip:       string;
    activo:        boolean;
}

export interface SubTipoTerceros {
    subTipoTerceroId: number;
    codigo:           string;
    descrip:          string;
    tipoTercero:      TipoTercero;
}

export interface RolOperacion {
    tipoOperacionId: number;
    codigo:          string;
    descrip:         string;
}
