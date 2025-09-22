import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { createLink } from "../../../services/links";
import { useAuth } from "../../../providers/AuthProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const isValidURL = (url) => {
  try {
    const parsedUrl = new URL(url);
    return Boolean(parsedUrl);
  } catch (error) {
    return false;
  }
};

function CreateLink({ open, handleClose, onLinkCreated }) {
  const [name, setName] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [errors, setErrors] = useState({ name: false, redirectTo: false });

  const { isAuthenticated, getToken } = useAuth();

  const handleCreate = async () => {
    if (!name || !redirectTo || !isValidURL(redirectTo)) {
      setErrors({
        name: !name,
        redirectTo: !redirectTo || !isValidURL(redirectTo),
      });
      return;
    }

    try {
      if (!isAuthenticated()) {
        console.error("Usuario no autenticado.");
        return;
      }

      const token = await getToken();
      const formattedName = name.replace(/\s+/g, "_"); // Reemplazar espacios por _
      const response = await createLink(formattedName, redirectTo, token);
      console.log(response);

      setName("");
      setRedirectTo("");
      setErrors({ name: false, redirectTo: false });
      handleClose();

      if (onLinkCreated) onLinkCreated();
    } catch (error) {
      console.error("Error creando enlace:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6">
            Crear Nuevo Acortador
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "black" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre del Link"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value.replace(/\s+/g, "_"))} // Reemplazo automático
            error={errors.name}
            helperText={errors.name ? "Este campo es obligatorio" : ""}
          />
          <TextField
            fullWidth
            margin="normal"
            label="URL de Redirección"
            variant="outlined"
            value={redirectTo}
            onChange={(e) => setRedirectTo(e.target.value.trim())} // Evita espacios innecesarios
            error={errors.redirectTo}
            helperText={
              errors.redirectTo ? "Ingrese una URL válida (ejemplo: https://example.com)" : ""
            }
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              sx={{ color: "white !important", fontWeight: "bold" }}
              disabled={!name || !redirectTo}
            >
              Crear
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

CreateLink.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onLinkCreated: PropTypes.func,
};
CreateLink.defaultProps = {
  onLinkCreated: null,
};

export default CreateLink;
