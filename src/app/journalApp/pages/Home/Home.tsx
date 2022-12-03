import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { JournalLayout } from "@/shared/components/Layout";
import { NoteView, NothingSelectedView } from "@/shared/views";
import { RootState } from "@/store";
import { startNewNote } from "@/store/journal";
import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch();
  const { isSaving, active, messageSaved } = useSelector(
    (state: RootState) => state.journal
  );
  const showNoteView = useMemo(() => !!active, [active]);

  useEffect(() => {
    if (messageSaved.includes("Actualizada"))
      Swal.fire("Alert", messageSaved, "success");
    if (messageSaved.includes("Eliminada"))
      Swal.fire("Alert", messageSaved, "error");
  }, [messageSaved]);

  const newNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {showNoteView ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={newNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          position: "fixed",
          right: 50,
          bottom: 50,
          ":hover": { backgroundColor: "error.main", opacity: "0.9" },
        }}>
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
