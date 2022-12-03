import { INote } from "@/app/journalApp/domain";
import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = ""): Promise<INote[]> => {
  if (!uid) throw new Error("El UID del usuario no existe");

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes: INote[] = [];
  docs.forEach((doc) => {
    const { title, body, date, imageUrls } = doc.data();
    notes.push({ id: doc.id, title, body, date, imageUrls });
  });
  return notes;
};


