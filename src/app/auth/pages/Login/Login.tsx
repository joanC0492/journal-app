import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
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
import { startGoogleSignIn, startLoginWithEmailPassword } from "@/store/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

const formData = {
  displayName: null,
  email: "joan0492@gmail.com",
  password: "mega-3254",
};

export const Login = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticated = useMemo(() => status === "checking", [status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password));
  };

  const handleGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={1}
          className="animate__animated animate__fadeIn animate__fast">
          <Grid item xs={12}>
            <TextField
              onChange={onInputChange}
              value={email}
              label="Correo"
              type="email"
              name="email"
              placeholder="correo@google.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={onInputChange}
              value={password}
              label="Contraseña"
              type="password"
              name="password"
              placeholder="contraseña"
              fullWidth
            />
          </Grid>
          <Grid container spacing={1} sx={{ my: 1 }}>
            {!!errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticated}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ textTransform: "capitalize" }}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticated}
                onClick={handleGoogleSignIn}
                variant="contained"
                fullWidth
                sx={{ textTransform: "capitalize" }}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
