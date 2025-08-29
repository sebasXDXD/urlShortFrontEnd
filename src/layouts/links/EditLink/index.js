import { useState, useEffect, useCallback } from "react";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../../providers/AuthProvider";
import { updateLink, getLinkById } from "../../../services/links";

function EditLink({ open, handleClose, linkId, onLinkUpdated }) {
  const [formData, setFormData] = useState({ name: "", redirect_to: "" });
  const [originalData, setOriginalData] = useState({ name: "", redirect_to: "" });
  const { getToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  // ✅ Definimos fetchLinkData ANTES del useEffect y con useCallback
  const fetchLinkData = useCallback(
    async (id) => {
      try {
        const token = await getToken();
        const data = await getLinkById(id, token);
        setFormData({ name: data.name, redirect_to: data.redirect_to });
        setOriginalData({ name: data.name, redirect_to: data.redirect_to });
      } catch (error) {
        console.error("Error fetching link data:", error);
        setErrorMessage("No se pudo cargar la información del enlace. Inténtalo de nuevo.");
      }
    },
    [getToken]
  );

  useEffect(() => {
    if (open && linkId) {
      fetchLinkData(linkId);
    }
  }, [open, linkId, fetchLinkData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/\s+/g, "_"),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isFormValid = formData.name.trim() !== "" && formData.redirect_to.trim() !== "";
  const isModified =
    formData.name !== originalData.name || formData.redirect_to !== originalData.redirect_to;

  const handleSubmit = async () => {
    if (!isFormValid || !isModified) return;
    try {
      const token = await getToken();
      await updateLink(linkId, formData.name, formData.redirect_to, token);
      onLinkUpdated();
      handleClose();
    } catch (error) {
      console.error("Error updating link:", error);
      setErrorMessage("Error al actualizar el enlace. Por favor, inténtalo más tarde.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setErrorMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setErrorMessage("")} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>

      <DialogTitle>
        Editar Enlace
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={formData.name.trim() === ""}
          helperText={formData.name.trim() === "" ? "El nombre es obligatorio" : ""}
        />
        <TextField
          fullWidth
          margin="dense"
          label="URL de Redirección"
          name="redirect_to"
          value={formData.redirect_to}
          onChange={handleChange}
          error={formData.redirect_to.trim() === ""}
          helperText={
            formData.redirect_to.trim() === "" ? "La URL de redirección es obligatoria" : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={!isFormValid || !isModified}>
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ✅ Definimos PropTypes + defaultProps
EditLink.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  linkId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLinkUpdated: PropTypes.func.isRequired,
};

EditLink.defaultProps = {
  linkId: null,
};

export default EditLink;
