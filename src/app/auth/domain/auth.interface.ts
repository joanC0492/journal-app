export interface IAuth {
  logged: boolean;
  name: string;
}

type typeAuth = "checking" | "not-authenticated" | "authenticated";
export interface IauthState {
  status: typeAuth;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}
