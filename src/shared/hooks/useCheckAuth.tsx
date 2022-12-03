import { IauthState } from "@/app/auth/domain";
import { RootState } from "@/store";
import { login, logout } from "@/store/auth";
import { startLoadingNotes } from "@/store/journal";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      const objAuthState: IauthState = {
        status: "not-authenticated",
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
      };

      if (!user) return dispatch(logout(objAuthState));
      const { uid, email, displayName, photoURL } = user;
      
      objAuthState.status = "authenticated";
      objAuthState.uid = uid;
      objAuthState.email = email;
      objAuthState.displayName = displayName;
      objAuthState.photoURL = photoURL;
      dispatch(login(objAuthState));
      dispatch(startLoadingNotes()); //Lista de Notes
    });
  }, []);

  return status;
};
