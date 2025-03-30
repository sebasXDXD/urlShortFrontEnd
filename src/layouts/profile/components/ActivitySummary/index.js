import React from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function ActivitySummary({ stats }) {
  const { urlsCreated, urlsLimit, totalClicks, popularUrl, popularUrlClicks, lastAccess } = stats;
  const usagePercentage = (urlsCreated / urlsLimit) * 100;

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox p={3}>
        <MDTypography variant="h6" fontWeight="medium" mb={2}>
          Resumen de Actividad
        </MDTypography>
        <Divider />
        <MDBox display="flex" flexDirection="column" mt={3} gap={2}>
          <MDBox>
            <MDTypography variant="subtitle2" color="text">
              URLs creadas este mes
            </MDTypography>
            <MDTypography variant="h4" fontWeight="medium">
              {`${urlsCreated} / ${urlsLimit}`}
            </MDTypography>
            <MDBox width="100%" bgcolor="#f0f2f5" borderRadius="lg" height={10} mt={1}>
              <MDBox
                width={`${usagePercentage}%`}
                bgcolor="#1A73E8"
                borderRadius="lg"
                height={10}
              />
            </MDBox>
          </MDBox>

          <MDBox>
            <MDTypography variant="subtitle2" color="text">
              Total de clics recibidos
            </MDTypography>
            <MDTypography variant="h4" fontWeight="medium">
              {totalClicks.toLocaleString()}
            </MDTypography>
          </MDBox>

          <MDBox>
            <MDTypography variant="subtitle2" color="text">
              URL más popular
            </MDTypography>
            <MDTypography variant="body2" fontWeight="regular">
              {`${popularUrl} - ${popularUrlClicks.toLocaleString()} clics`}
            </MDTypography>
          </MDBox>

          <MDBox>
            <MDTypography variant="subtitle2" color="text">
              Último acceso
            </MDTypography>
            <MDTypography variant="body2" fontWeight="regular">
              {lastAccess}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ActivitySummary.propTypes = {
  stats: PropTypes.shape({
    urlsCreated: PropTypes.number.isRequired,
    urlsLimit: PropTypes.number.isRequired,
    totalClicks: PropTypes.number.isRequired,
    popularUrl: PropTypes.string.isRequired,
    popularUrlClicks: PropTypes.number.isRequired,
    lastAccess: PropTypes.string.isRequired,
  }).isRequired,
};

export default ActivitySummary;
