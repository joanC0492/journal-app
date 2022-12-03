import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "@/shared/components";
import { useForm } from "@/shared/hooks/useForm";
import { IformValidation, Ilogin } from "@/app/auth/domain";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserEmail } from "@/store/auth";
import { RootState } from "@/store";

const formData: Ilogin = {
  displayName: "",
  email: "",
  password: "",
};
const formValidations: IformValidation = {
  displayName: [
    (value: string): boolean => value.trim().length > 0,
    "El nombre es obligatorio",
  ],
  email: [
    (value: string): boolean => value.includes("@"),
    "El correo debe de tener un arroba",
  ],
  password: [
    (value: string): boolean => value.length >= 6,
    "El password debe de tener más de 6 letras",
  ],
};

export const Register = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    displayName,
    email,
    password,
    formState,
    onInputChange,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserEmail(formState));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
          className="animate__animated animate__fadeIn animate__fast">
          <Grid item xs={12}>
            <TextField
              onChange={onInputChange}
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              name="displayName"
              value={displayName}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onInputChange}
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              name="email"
              value={email}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onInputChange}
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              name="password"
              value={password}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              fullWidth
            />
          </Grid>

          <Grid container spacing={1} sx={{ my: 1 }}>
            {!!errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ textTransform: "capitalize" }}>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="end" mt={1}>
            <Typography mr={1}>¿Ya tienes una cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
