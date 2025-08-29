import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "providers/AuthProvider";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function SignOut() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate(-1); // vuelve a la ruta anterior si cancelas
  };

  const handleConfirm = () => {
    logout();
    navigate("/authentication/sign-in");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmar cierre de sesión</DialogTitle>
      <DialogContent>
        <DialogContentText>¿Estás seguro de que deseas cerrar sesión?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            color: "#fff",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          Cerrar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignOut;
