import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Snackbar, Alert } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function ShareButton({ url, title = "Mira este enlace" }) {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const shareOnSocial = async (platform) => {
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
        break;
      case "instagram":
        setSnackbar({
          open: true,
          message: "Instagram no permite compartir enlaces directamente.",
          severity: "warning",
        });
        return;
      default:
        break;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
    handleCloseMenu();
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      setSnackbar({
        open: true,
        message: "La funcionalidad de compartir no es compatible con este navegador.",
        severity: "warning",
      });
    }
  };

  return (
    <>
      <MDButton variant="outlined" color="info" size="small" onClick={handleClick}>
        <ShareIcon fontSize="small" />
        <MDTypography
          variant="button"
          fontWeight="medium"
          ml={1}
          display={{ xs: "none", sm: "block" }}
        >
          Compartir
        </MDTypography>
      </MDButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleNativeShare}>
          <ShareIcon sx={{ mr: 1 }} /> Compartir Nativo
        </MenuItem>
        <MenuItem onClick={() => shareOnSocial("whatsapp")}>
          <WhatsAppIcon sx={{ mr: 1, color: "green" }} /> WhatsApp
        </MenuItem>
        <MenuItem onClick={() => shareOnSocial("facebook")}>
          <FacebookIcon sx={{ mr: 1, color: "#1877f2" }} /> Facebook
        </MenuItem>
        <MenuItem onClick={() => shareOnSocial("twitter")}>
          <TwitterIcon sx={{ mr: 1, color: "#1DA1F2" }} /> X (Twitter)
        </MenuItem>
        <MenuItem onClick={() => shareOnSocial("instagram")}>
          <InstagramIcon sx={{ mr: 1, color: "#E4405F" }} /> Instagram
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};
ShareButton.defaultProps = {
  title: "Mira este enlace",
};

export default ShareButton;
