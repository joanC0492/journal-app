import { createContext, useReducer } from "react";
import { IAuth, IAuthApp } from "../app/auth/domain";
import { reducer } from "./reducer";

interface IProps {
  children: React.ReactNode;
}

const initialState: IAuthApp = {
  auth: {} as IAuth,
  setAuth: (name: string) => {},
  deleteAuth: () => {},
};

const GlobalContext = createContext(initialState);

const GlobalProvider: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLogin = (name: string) => {
    dispatch({
      type: "SET_LOGIN",
      payload: {
        logged: true,
        name,
      },
    });
  };

  const setLogout = () => {
    dispatch({
      type: "SET_LOGIN",
      payload: {
        logged: false,
        name: "",
      },
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        auth: state.auth,
        setAuth: (name: string) => setLogin(name),
        deleteAuth: () => setLogout(),
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
