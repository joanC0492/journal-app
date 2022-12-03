import { Home } from "../pages";

enum JournalApp {
  "HOME" = "Home",
}

interface Iroute {
  path: string;
  element: () => JSX.Element;
  name: string;
  to?: string;
}

export const routes: Iroute[] = [
  {
    path: "",
    element: Home,
    name: JournalApp.HOME,
  },
];
