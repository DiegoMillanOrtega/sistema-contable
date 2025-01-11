export const TIPOS_DE_DOCUMENTO = [
    { label: 'CC - Cédula de Ciudadanía', value: 'CC' },
    { label: 'TI - Tarjeta de Identidad', value: 'TI' },
    { label: 'RC - Registro Civil de Nacimiento', value: 'RC' },
    { label: 'CE - Cédula de Extranjería', value: 'CE' },
    { label: 'PA - Pasaporte', value: 'PA' },
    { label: 'PEP - Permiso Especial de Permanencia', value: 'PEP' },
    { label: 'PPT - Permiso por Protección Temporal', value: 'PPT' },
    { label: 'NIT - Número de Identificación Tributaria', value: 'NIT' },
    { label: 'DIM - Documento de Identificación de Extranjero Menor', value: 'DIM' },
    { label: 'CD - Carné Diplomático', value: 'CD' },
    { label: 'SV - Salvoconducto', value: 'SV' },
  ];

  export const TIPOS_TERCEROS = [
    { label: 'Persona Natural', value: 'PN' },
    { label: 'Persona Juridica', value: 'PJ' },
    { label: 'Entidades Publicas', value: 'EP' },   

  ];

  export const GENEROS = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
    { label: 'Otro', value: 'O' },
  ];

  export const ESTADOS_CIVILES = [
    { label: 'Soltero', value: 'S' },
    { label: 'Casado', value: 'C' },
    { label: 'Viudo', value: 'V' },
    { label: 'Divorciado', value: 'D' },
    { label: 'Separado', value: 'E' },
    { label: 'Casado o Viudo', value: 'CV' },
    { label: 'Divorciado o Separado', value: 'DE' },
  ];

  export const ROL_OPERACION = [
    { label: 'Cliente', value: 'C' },
    { label: 'Proveedor', value: 'P' },
    { label: 'Entidad Financiera', value: 'F' },
    { label: 'Entidad Pública', value: 'E' },
    { label: 'Empresa', value: 'EMP' },
    { label: 'Intermediario', value: 'I' },
    { label: 'Acreedor', value: 'AC' },
    { label: 'Deudor', value: 'DE' },
    { label: 'Contratista o Subcontratista', value: 'CT' },
    { label: 'Accionista o Socio', value: 'A' },
    { label: 'Empleado', value: 'EMPDO' },
  ];

  export const SUBTIPOS_PERSONA = [
    { label: 'Sociedad Anónima (S.A.)', value: 'SA', tipoPersona: 'PJ' },
    { label: 'Sociedad Limitada (S.L.)', value: 'SL', tipoPersona: 'PJ' },
    { label: 'Sociedad Comanditaria (S.C.)', value: 'SC', tipoPersona: 'PJ' },
    { label: 'Sociedad por Acciones Simplificadas (S.A.S.)', value: 'SAS', tipoPersona: 'PJ' },
    { label: 'Entidad sin Ánimo de Lucro', value: 'EAL', tipoPersona: 'PJ' },
    { label: 'Cooperativa', value: 'CO' , tipoPersona: 'PJ' },
    { label: 'Comerciante', value: 'CO' , tipoPersona: 'PN' },
    { label: 'No Comerciante Independiente', value: 'NCI' , tipoPersona: 'PN' },
    { label: 'Profesional Independiente', value: 'PI', tipoPersona: 'PN' },
    { label: 'Contratista', value: 'CT', tipoPersona: 'PN' },
    { label: 'Subcontratista', value: 'CT', tipoPersona: 'PN' },
    { label: 'Gobierno Central', value: 'GC', tipoPersona: 'EP' },
    { label: 'Entidad Territorial', value: 'ET', tipoPersona: 'EP' },
    { label: 'Entidad Descentralizada', value: 'ED', tipoPersona: 'EP' },
  ]
  