import { IAuth } from "./auth.interface";

export interface IAuthApp {
  auth: IAuth;
  setAuth: (name: string) => void;
  deleteAuth: () => void;
}
