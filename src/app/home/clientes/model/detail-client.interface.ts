export interface DetailClient {
    Id: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    edad: string,
    telefono: string,
    sede: string, 
    membresia: string,
    fechafin: string,
    dni: string,
    fechaNacimiento: string,
    fecha_nacimiento: string,
    usuario? : string,
    entrenador: string,
    idEntrenador?: number,
    modificacion_metricas?: string,
    modificacion_plan?: string
  }