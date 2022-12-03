import { StarOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <>
      <Grid
        direction="column"
        alignItems="center"
        justifyContent="center"
        container
        sx={{
          minHeight: "calc(100vh - 110px)",
          backgroundColor: "primary.main",
          borderRadius: 3,
        }}>
        <Grid item xs={12}>
          <StarOutline sx={{ fontSize: 100, color: "white" }} />
        </Grid>
        <Grid item xs={12}>
          <Typography color="white" sx={{ fontSize: 28 }}>
            Selecciona o crea una entrada
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
