import { RootState } from "@/store";
import { Drawer, Box, Toolbar, Typography, Divider, List } from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "@/shared/components";
import { useMemo } from "react";

interface IProps {
  drawerWidth: number;
}

export const SideBar: React.FC<IProps> = ({ drawerWidth }) => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes, active } = useSelector((state: RootState) => state.journal);

  const index = useMemo(() => active?.id || "", [active]);

  return (
    <>
      <Box component="nav" sx={{ width: { sm: `${drawerWidth}px` } }}>
        <Drawer
          variant="permanent"
          open={true}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: `${drawerWidth}px`,
            },
          }}>
          <Toolbar>
            <Typography
              component="p"
              sx={{ lineHeight: "1.15", fontWeight: "500" }}>
              {displayName}
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {notes.map((note) => (
              <SideBarItem
                key={note.id}
                {...note}
                selectedIndex={index}
                handleListItemClick={() => {}}
              />
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
};
