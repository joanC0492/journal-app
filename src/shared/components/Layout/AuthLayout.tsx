import { Grid, Typography } from "@mui/material";

interface IProps {
  children: React.ReactNode;
  title?: string;
}

export const AuthLayout: React.FC<IProps> = ({ children, title = "" }) => {
  return (
    <Grid
      container      
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}>
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { sm: "450px" },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}>
        <Typography
          align="center"
          variant="h4"
          component="h1"
          sx={{ mb: 1, fontWeight: "500" }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};
