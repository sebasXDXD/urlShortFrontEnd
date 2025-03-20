import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../../providers/AuthProvider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { updateLink, getLinkById } from "../../../services/links";
import CloseIcon from "@mui/icons-material/Close";

function EditLink({ open, handleClose, linkId, onLinkUpdated }) {
  const [formData, setFormData] = useState({ name: "", redirect_to: "" });
  const [originalData, setOriginalData] = useState({ name: "", redirect_to: "" });
  const { getToken } = useAuth();

  useEffect(() => {
    if (open && linkId) {
      fetchLinkData(linkId);
    }
  }, [open, linkId]);

  const fetchLinkData = async (id) => {
    try {
      const token = await getToken();
      const data = await getLinkById(id, token);
      setFormData({ name: data.name, redirect_to: data.redirect_to });
      setOriginalData({ name: data.name, redirect_to: data.redirect_to });
    } catch (error) {
      console.error("Error fetching link data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Solo formatear el nombre si está cambiando el campo 'name'
    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/\s+/g, "_"), // Reemplazar espacios por guiones bajos
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
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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

EditLink.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  linkId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLinkUpdated: PropTypes.func.isRequired,
};

export default EditLink;
