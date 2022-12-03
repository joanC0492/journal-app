import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "@/shared/components";

interface IProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

export const JournalLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn animate__fast">
      {/* navbar */}
      <NavBar drawerWidth={drawerWidth} />
      {/* Sidebar */}
      <SideBar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% + -${drawerWidth}px)` }}>
        {/* Toolbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
