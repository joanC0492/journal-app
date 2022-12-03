export interface Ilogin {
  displayName: string | null;
  email: string;
  password: string;
}

export interface IformValidation {
  displayName: [(value: string) => boolean, string];
  email: [(value: string) => boolean, string];
  password: [(value: string) => boolean, string];
}

export interface IloginValid {
  displayNameValid: string | null;
  emailValid: string | null;
  passwordValid: string | null;
}