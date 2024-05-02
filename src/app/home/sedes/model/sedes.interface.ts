export interface Sede {
  idSede?: number;
  nombreSede: string;
  abreviacion: string;
  direccion: string;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  estado?: string;
  usuarioModificacion?: number;
}
