import { INote } from "./";

export interface IjournalState {
  isSaving: boolean; // Estoy guardando? true o false
  messageSaved: string; // Mensaje de grabacion
  notes: INote[]; // Notes
  active: INote | null; // Nota activa
}
