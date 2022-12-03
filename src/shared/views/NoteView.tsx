import { INote } from "@/app/journalApp/domain";
import { RootState } from "@/store";
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUpLoadingFiles,
} from "@/store/journal";
import {
  DeleteOutlineOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, Typography, TextField, IconButton } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageGallery } from "../components";
import { useForm } from "../hooks";

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note, isSaving } = useSelector(
    (state: RootState) => state.journal
  );

  const refInputFile = useRef<HTMLInputElement>(null);

  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString: string = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const images: string[] = useMemo(() => {
    return note?.imageUrls || [];
  }, [note]);

  useEffect(() => {
    dispatch(setActiveNote(formState as INote));
  }, [formState]);

  const handleSaveNote = () => {
    dispatch(startSaveNote());
  };

  const handleFileInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (!target.files) return;
    dispatch(startUpLoadingFiles(target.files));
  };

  const handleDeleteNote = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={32} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          ref={refInputFile}
          type="file"
          multiple
          onChange={handleFileInputchange}
          style={{ display: "none" }}
        />
        <IconButton
          disabled={isSaving}
          onClick={() => refInputFile.current?.click()}>
          <UploadOutlined />
        </IconButton>
        <Button
          onClick={handleSaveNote}
          color="primary"
          sx={{ padding: 2 }}
          disabled={isSaving}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          onChange={onInputChange}
          value={title}
          name="title"
          type="text"
          variant="filled"
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          fullWidth
        />
        <TextField
          onChange={onInputChange}
          value={body}
          name="body"
          type="text"
          variant="filled"
          placeholder="¿Qué sucedio en el dia de hoy?"
          sx={{ border: "none", mb: 1 }}
          fullWidth
          multiline
          minRows={5}
        />
      </Grid>

      <Grid container alignItems={"center"} justifyContent="flex-end">
        <Button onClick={handleDeleteNote} sx={{ color: "error.main" }}>
          <DeleteOutlineOutlined />
          <span style={{ position: "relative", top: "1px", left: "0" }}>
            Eliminar
          </span>
        </Button>
      </Grid>

      <Grid container>
        <ImageGallery images={images} />
      </Grid>
    </Grid>
  );
};