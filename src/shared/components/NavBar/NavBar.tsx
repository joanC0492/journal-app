import { startLogoutFirebase } from "@/store/auth";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

interface IProps {
  drawerWidth: number;
}

export const NavBar: React.FC<IProps> = ({ drawerWidth }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogoutFirebase());
  };
  
  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}>
      <Toolbar>
        <IconButton sx={{ color: "#fff", mr: 2, display: { sm: "none" } }}>
          <MenuOutlined />
        </IconButton>

        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            JournalApp
          </Typography>
          <IconButton color="error" onClick={handleLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
