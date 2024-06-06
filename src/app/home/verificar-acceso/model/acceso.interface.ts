export interface Acceso {
  id_persona: string;
  numero_documento_identidad: string;
  nombre_cliente: string;
  nombre_membresia: string;
  nombre_sede: string;
  inicio_periodo: Date;
  fin_periodo: Date;
  dia_cobro: Date;
  dia_pago: Date;
  estado_pago: string;
}
