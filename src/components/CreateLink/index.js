import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { createLink } from "../../services/links";
import { useAuth } from "../../providers/AuthProvider"; // Importa useAuth para obtener el token de autenticación

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
};

function CreateLink({ open, handleClose }) {
  const [name, setName] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const { isAuthenticated } = useAuth(); // Obtén isAuthenticated del contexto de autenticación
  const { getToken } = useAuth();
  const handleCreate = async () => {
    try {
      if (!isAuthenticated()) {
        console.error("Usuario no autenticado.");
        // Puedes manejar el caso de usuario no autenticado aquí
        return;
      }
      const token = await getToken();
      const response = await createLink(name, redirectTo, token);
      console.log(response);
      handleClose(); // Cierra el modal después de crear el enlace
    } catch (error) {
      console.error("Error creating link:", error);
      // Manejar errores (opcional): mostrar mensaje al usuario, etc.
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Crear Nuevo Acortador
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre del Link"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="URL de Redirección"
            variant="outlined"
            value={redirectTo}
            onChange={(e) => setRedirectTo(e.target.value)}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleCreate}>
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
};

export default CreateLink;
