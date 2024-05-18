export interface MiPlan {
  id_persona: number;
  id_plan_entrenamiento: number;
  dia: number;
  id_grupo_muscular: number;
  nombre_grupo_muscular: string;
  id_ejercicio: number;
  nombre: string;
  imagen: string;
  series: number;
  repeticiones: number;
}
