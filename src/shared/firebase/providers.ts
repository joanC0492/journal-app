import { IsingInGoogle, Ilogin } from "@/app/auth/domain";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<IsingInGoogle> => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
      errorMessage: null,
    };
  } catch (error) {
    let errorMessage = "";
    if (error instanceof Error) errorMessage = error.message;
    return {
      ok: false,
      displayName: null,
      email: null,
      photoURL: null,
      uid: null,
      errorMessage,
    };
  }
};

export const registerUserEmail = async ({
  email,
  password,
  displayName,
}: Ilogin): Promise<IsingInGoogle> => {
  try {
    const res = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = res.user;
    await updateProfile(FirebaseAuth.currentUser!, {
      displayName,
    });
    console.log("res.user",res.user)
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
      errorMessage: null,
    };
  } catch (error) {
    console.log("error: ", error);
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      ok: false,
      displayName: null,
      email: null,
      photoURL: null,
      uid: null,
      errorMessage,
    };
  }
};

export const loginWithEmailPassword = async (
  email: string,
  password: string
): Promise<IsingInGoogle> => {
  try {
    const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    const { displayName, photoURL, uid } = res.user;

    return {
      ok: true,
      displayName: displayName,
      email,
      photoURL: photoURL,
      uid: uid,
      errorMessage: null,
    };
  } catch (error) {
    let errorMessage: string = "";
    if (error instanceof Error) errorMessage = error.message;
    return {
      ok: false,
      displayName: null,
      email: null,
      photoURL: null,
      uid: null,
      errorMessage,
    };
  }
};

export const logoutFirebase = async () => await FirebaseAuth.signOut();