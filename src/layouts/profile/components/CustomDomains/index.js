import React from "react";
import PropTypes from "prop-types"; // Importa PropTypes
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function CustomDomains({ domain }) {
  return (
    <Card>
      <MDBox p={3}>
        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
          <LanguageIcon color="info" />
          <MDTypography variant="h6" fontWeight="medium">
            Dominios Personalizados
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox mt={3}>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <MDTypography variant="subtitle2">Dominio activo</MDTypography>
            <Tooltip title="Solo disponible en Plan Pro o superior">
              <InfoIcon fontSize="small" color="info" />
            </Tooltip>
          </MDBox>
          <MDInput
            label="Dominio personalizado"
            placeholder="mi-marca.com"
            value={domain}
            fullWidth
            InputProps={{
              endAdornment: (
                <Button size="small" color="info" variant="contained">
                  Verificar
                </Button>
              ),
            }}
          />
          <MDBox mt={3}>
            <MDTypography variant="body2" color="text" mb={1}>
              Configuración DNS:
            </MDTypography>
            <Card variant="outlined" sx={{ bgcolor: "#f8f9fa" }}>
              <MDBox p={2}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <MDTypography variant="caption" fontWeight="bold">
                      Tipo
                    </MDTypography>
                  </Grid>
                  <Grid item xs={4}>
                    <MDTypography variant="caption" fontWeight="bold">
                      Nombre
                    </MDTypography>
                  </Grid>
                  <Grid item xs={4}>
                    <MDTypography variant="caption" fontWeight="bold">
                      Valor
                    </MDTypography>
                  </Grid>
                  <Grid item xs={4}>
                    <MDTypography variant="caption">CNAME</MDTypography>
                  </Grid>
                  <Grid item xs={4}>
                    <MDTypography variant="caption">@</MDTypography>
                  </Grid>
                  <Grid item xs={4}>
                    <MDTypography variant="caption">acorta.do.cdn.url</MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="info">
              Guardar configuración
            </Button>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

CustomDomains.propTypes = {
  domain: PropTypes.string.isRequired,
};

export default CustomDomains;
