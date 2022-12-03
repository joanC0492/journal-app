import { IformValidation, Ilogin, IloginValid } from "@/app/auth/domain";
import { useEffect, useMemo, useState } from "react";

const init: Ilogin = {
  displayName: null,
  email: "",
  password: "",
};

// export const useForm = (
//   initialForm: Ilogin = init,
//   formValidations: IformValidation = {} as IformValidation
// ) => {
export const useForm = (
  initialForm: any = init,
  formValidations: IformValidation = {} as IformValidation
) => {
  // const [formState, setFormState] = useState<Ilogin>(initialForm);
  const [formState, setFormState] = useState<any>(initialForm);
  const [formValidation, setFormValidation] = useState({} as IloginValid);
  // console.log("formState", formState);

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid: boolean = useMemo(() => {
    for (const formValue in formValidation)
      if (formValidation[formValue as keyof IloginValid] !== null) return false;
    return true;
  }, [formValidation]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { name, value },
    } = e;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = (): void => {
    setFormState(initialForm);
  };

  const createValidators = (): void => {
    if (!formValidations) return;

    const formCheckedValues = {} as IloginValid;
    for (let formField in formValidations) {
      const [fn, errorMessage] =
        formValidations[formField as keyof IformValidation];

      formCheckedValues[`${formField}Valid` as keyof IloginValid] = fn(
        formState[formField as keyof Ilogin] as string
      )
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};




