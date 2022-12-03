import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IjournalState, INote } from "@/app/journalApp/domain";

const initialState: IjournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [] as INote[],
  active: null,
};
export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action: PayloadAction<INote>) => {
      /*Agregamos una nota vacia*/
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action: PayloadAction<INote>) => {
      /*Establecer cual es la nota activa */
      state.active = action.payload;
      state.messageSaved = ``;
    },
    setNotes: (state, action: PayloadAction<INote[]>) => {
      /*Cargar las notas | Establecer las notas*/
      state.notes = action.payload;
    },
    setSaving: (state) => {
      /*Cuando estoy grabando las notas | colocar el isSaving en true*/
      state.isSaving = true;
      state.messageSaved = ``;
    },
    updateNote: (state, action: PayloadAction<INote>) => {
      /*Actualiza la nota por ID*/
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            ...action.payload,
          };
        }
        return note;
      });
      state.messageSaved = `NOTA [${action.payload.title}], Actualizada correctamente`;
    },

    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },
    setImagesActiveNote: (state, action: PayloadAction<string[]>) => {
      state.isSaving = false;
      state.active!.imageUrls = [
        ...state.active!.imageUrls!,
        ...action.payload,
      ];
    },

    deleteNoteById: (state, action: PayloadAction<string>) => {
      /**/
      state.messageSaved = `NOTA [${action.payload}], Eliminada correctamente`;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.active = null;      
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  savingNewNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  setImagesActiveNote,
  clearNotesLogout,
} = journalSlice.actions;
