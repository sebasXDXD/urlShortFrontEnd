import React from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function ErrorNotification({ error, onClose }) {
  if (!error) return null;

  return (
    <MDBox
      position="fixed"
      top="20px"
      right="20px"
      zIndex="9999"
      p={2}
      bgColor="red"
      borderRadius="lg"
      boxShadow={3}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      maxWidth="300px"
    >
      <MDTypography variant="h6" color="white" mb={1}>
        Error
      </MDTypography>
      <MDTypography variant="body2" color="white" mb={1}>
        {error}
      </MDTypography>
      <MDButton variant="outlined" color="white" onClick={onClose}>
        Close
      </MDButton>
    </MDBox>
  );
}

ErrorNotification.propTypes = {
  error: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorNotification;
