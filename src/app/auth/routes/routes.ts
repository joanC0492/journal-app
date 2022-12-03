import { Login, Register } from "../pages";

enum AuthRoutes {
  "LOGIN" = "Login",
  "REGISTER" = "Register",
}

interface Iroute {
  path: string;
  element: () => JSX.Element;
  name: string;
  to?: string;
}

export const routes: Iroute[] = [
  {
    path: "/login",
    element: Login,
    name: AuthRoutes.LOGIN,
  },
  {
    path: "/register",
    element: Register,
    name: AuthRoutes.REGISTER,
  },
];
