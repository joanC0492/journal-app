import { FirebaseDB } from "@/shared/firebase/config";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setImagesActiveNote,
  deleteNoteById,
} from "./journalSlice";
import { INote } from "@/app/journalApp/domain";
import { fileUpload, loadNotes } from "@/shared/helpers";

export const startDeletingNote = (): any => {
  return async (dispatch: any, getState: any) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};

// UP FILES
export const startUpLoadingFiles = (files: FileList): any => {
  return async (dispatch: any, getState: any) => {
    dispatch(setSaving());
    const fileUploadPromises = [];
    for (const file of files) {
      if (!file.type.includes("image/")) break; //Si no es imagen no lo considero
      fileUploadPromises.push(fileUpload(file));
    }
    let imagesUrl = await Promise.all(fileUploadPromises);
    dispatch(setImagesActiveNote(imagesUrl as string[]));
  };
};

// UPDATE
export const startSaveNote = (): any => {
  return async (dispatch: any, getState: any) => {
    // Esta guardandose asi que desabilitamos el boton guardar
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    console.log("noteToFirestore", noteToFirestore);
    // Referencia la documento
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(note as INote));
  };
};

// READ
export const startLoadingNotes: any = () => {
  return async (dispatch: any, getState: any) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");
    const notes: INote[] = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

// CREATE
export const startNewNote = (): any => {
  return async (dispatch: any, getState: any) => {
    dispatch(savingNewNote());
    // Obtenemos el uid
    const { uid } = getState().auth;

    // Necesitamos el uid
    const newNote: INote = {
      id: "",
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    // Obtenemos las propiedades menos el id en "objNewNote"
    const { id, ...objNewNote } = newNote;

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, objNewNote);

    newNote.id = newDoc.id;
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};
