import { checkingCredentials, logout, login } from "./authSlice";
import { IauthState, Ilogin } from "@/app/auth/domain";
import {
  signInWithGoogle,
  registerUserEmail,
  loginWithEmailPassword,
  logoutFirebase,
} from "@/shared/firebase/providers";
import { clearNotesLogout } from "../journal";

export const startLogoutFirebase = (): any => {
  return async (dispatch: any) => {
    let objAuthState: IauthState = {
      email: null,
      displayName: null,
      errorMessage: null,
      photoURL: null,
      status: "not-authenticated",
      uid: null,
    };
    try {
      await logoutFirebase();
      dispatch(logout(objAuthState));
      dispatch(clearNotesLogout());
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const startCreatingUserEmail = ({
  email,
  password,
  displayName,
}: Ilogin): any => {
  return async (dispatch: any): Promise<void> => {
    let objAuthState: IauthState = {
      email: null,
      displayName: null,
      errorMessage: null,
      photoURL: null,
      status: "checking",
      uid: null,
    };

    dispatch(checkingCredentials(objAuthState));

    const result = await registerUserEmail({ email, password, displayName });
    if (!result.ok) {
      objAuthState.errorMessage = result.errorMessage;
      objAuthState.status = "not-authenticated";
      return dispatch(logout(objAuthState));
    }
    objAuthState.email = result.email;
    objAuthState.displayName = result.displayName;
    objAuthState.errorMessage = result.errorMessage;
    objAuthState.photoURL = result.photoURL;
    objAuthState.status = "authenticated";
    objAuthState.uid = result.uid;
    return dispatch(login(objAuthState));
  };
};

export const startGoogleSignIn = (): any => {
  return async (dispatch: any): Promise<void> => {
    let objAuthState: IauthState = {
      email: null,
      displayName: null,
      errorMessage: null,
      photoURL: null,
      status: "checking",
      uid: null,
    };

    dispatch(checkingCredentials(objAuthState));

    const result = await signInWithGoogle();
    if (!result.ok) {
      objAuthState.errorMessage = result.errorMessage;
      objAuthState.status = "not-authenticated";
      return dispatch(logout(objAuthState));
    }
    objAuthState.email = result.email;
    objAuthState.displayName = result.displayName;
    objAuthState.errorMessage = result.errorMessage;
    objAuthState.photoURL = result.photoURL;
    objAuthState.status = "authenticated";
    objAuthState.uid = result.uid;
    return dispatch(login(objAuthState));
  };
};

export const checkingAuthentication = (
  email: string,
  password: string
): any => {
  return async (dispatch: any): Promise<void> => {
    const objAuthState: IauthState = {
      email,
      displayName: "",
      errorMessage: "",
      photoURL: "",
      status: "checking",
      uid: null,
    };
    dispatch(checkingCredentials(objAuthState));
  };
};

export const startLoginWithEmailPassword = (
  email: string,
  password: string
): any => {
  return async (dispatch: any): Promise<void> => {
    const objAuthState: IauthState = {
      status: "checking",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null,
    };
    dispatch(checkingCredentials(objAuthState));

    const res = await loginWithEmailPassword(email, password);

    if (!res.ok) {
      objAuthState.status = "not-authenticated";
      objAuthState.errorMessage = res.errorMessage;
      return dispatch(logout(objAuthState));
    }
    objAuthState.status = "authenticated";
    objAuthState.uid = res.uid;
    objAuthState.email = res.email;
    objAuthState.displayName = res.displayName;
    objAuthState.photoURL = res.photoURL;
    objAuthState.errorMessage = res.errorMessage;
    return dispatch(login(objAuthState));
  };
};
