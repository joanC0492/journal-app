import { IAuth, IAuthApp } from "../app/auth/domain";

type TAction = "SET_LOGIN";
interface IAction {
  type: TAction;
  payload: IAuth;
}

export const reducer: React.Reducer<IAuthApp, IAction> = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        auth: { ...action.payload },
      };
    default:
      return state;
  }
};
