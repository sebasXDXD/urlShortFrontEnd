import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LinkIcon from "@mui/icons-material/Link";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import LinkIconComponent from "components/LinkIcon";
import { getLinks } from "../../services/links";
import EditLink from "./EditLink";
import ShareButton from "./shareButton";
import CreateLink from "./CreateLink";

function Links() {
  const [linksData, setLinksData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [expandedLinks, setExpandedLinks] = useState({});

  const toggleExpand = (id) => {
    setExpandedLinks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchData = async () => {
    try {
      const data = await getLinks();
      setLinksData(data);
      return data;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedLinkId, setSelectedLinkId] = useState(null);

  // Función para copiar al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setSnackbar({
          open: true,
          message: "¡Enlace copiado al portapapeles!",
          severity: "success",
        });
      },
      () => {
        setSnackbar({
          open: true,
          message: "Error al copiar el enlace",
          severity: "error",
        });
      }
    );
  };

  // Función para generar la URL corta basada en el ID
  const getShortUrl = (name) => `${window.location.origin}/redirect/${name}`;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox display="flex" justifyContent="flex-end" mb={2}>
          <MDButton variant="gradient" color="info" fullWidth onClick={handleOpen}>
            <LinkIcon sx={{ mr: 1 }} />
            Crear Link
          </MDButton>
        </MDBox>

        <Grid container spacing={4}>
          {linksData.map((link) => (
            <Grid item xs={12} sm={6} md={6} key={link.id}>
              <Card>
                <MDBox
                  p={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <MDBox display="flex" alignItems="center" width="100%" mb={1}>
                    <LinkIconComponent url={link.redirect_to} />
                    <MDBox flex={1} overflow="hidden">
                      <MDTypography
                        variant="button"
                        fontWeight="medium"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                          display: "block",
                          cursor: "pointer",
                        }}
                      >
                        {getShortUrl(link.name)}
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  {/* Enlace completo, truncado por defecto */}
                  <MDBox display="flex" flexDirection="column" width="100%">
                    <MDTypography
                      variant="body2"
                      sx={{
                        whiteSpace: expandedLinks[link.id] ? "normal" : "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleExpand(link.id)}
                    >
                      {expandedLinks[link.id]
                        ? link.redirect_to
                        : `${link.redirect_to.substring(0, 150)}...`}
                    </MDTypography>
                    {!expandedLinks[link.id] && (
                      <MDTypography
                        variant="caption"
                        color="primary"
                        sx={{ cursor: "pointer", fontWeight: "medium" }}
                        onClick={() => toggleExpand(link.id)}
                      >
                        Ver más
                      </MDTypography>
                    )}
                  </MDBox>

                  {/* Botones para acciones */}
                  <MDBox
                    display="flex"
                    gap={1}
                    flexWrap="wrap"
                    justifyContent="center"
                    width="100%"
                  >
                    <MDButton
                      variant="outlined"
                      color="info"
                      size="small"
                      onClick={() =>
                        window.open(
                          `http://localhost:8000/${link.name}`,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      title="Visitar URL"
                    >
                      Visitar
                    </MDButton>

                    <MDButton
                      variant="outlined"
                      color="info"
                      size="small"
                      onClick={() => copyToClipboard(link.redirect_to)}
                    >
                      <ContentCopyIcon fontSize="small" />
                      <MDTypography
                        variant="button"
                        fontWeight="medium"
                        ml={1}
                        display={{ xs: "none", sm: "block" }}
                      >
                        Copiar
                      </MDTypography>
                    </MDButton>

                    <MDButton
                      variant="outlined"
                      color="info"
                      size="small"
                      onClick={() => {
                        setSelectedLinkId(link.id);
                        setEditOpen(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                      <MDTypography
                        variant="button"
                        fontWeight="medium"
                        ml={1}
                        display={{ xs: "none", sm: "block" }}
                      >
                        Editar
                      </MDTypography>
                    </MDButton>

                    <MDButton variant="outlined" color="info" size="small">
                      <QrCodeIcon fontSize="small" />
                      <MDTypography
                        variant="button"
                        fontWeight="medium"
                        ml={1}
                        display={{ xs: "none", sm: "block" }}
                      >
                        QR
                      </MDTypography>
                    </MDButton>
                    <ShareButton url={getShortUrl(link.name)} title="Mira este enlace" />
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MDBox>

      <Footer />
      <CreateLink open={open} handleClose={handleClose} onLinkCreated={fetchData} />
      <EditLink
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        linkId={selectedLinkId}
        onLinkUpdated={fetchData}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default Links;
