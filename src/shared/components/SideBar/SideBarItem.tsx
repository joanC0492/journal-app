import { INote } from "@/app/journalApp/domain";
import { setActiveNote } from "@/store/journal";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

interface IProps extends INote {
  selectedIndex: string;
  handleListItemClick: (index: string) => void;
}

export const SideBarItem = ({
  id,
  title,
  body,
  date,
  imageUrls = [],
  selectedIndex,
  handleListItemClick,
}: IProps) => {
  const dispatch = useDispatch();

  const handleNoteActive = (): void => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
    handleListItemClick(id);
  };

  const newTitle = useMemo(
    () => (title.length > 17 ? title.substring(0, 17) + "..." : title),
    [title]
  );

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={handleNoteActive}
        selected={selectedIndex === id}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText
            primary={newTitle}
            // sx={{
            //   "& .MuiListItemText-primary": {
            //     width: "151px",
            //     whiteSpace: "nowrap",
            //     textOverflow: "ellipsis",
            //     overflow: "hidden",
            //   },
            // }}
          />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
