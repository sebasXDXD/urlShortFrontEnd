import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import PropTypes from "prop-types";

function UserProfileHeader({ user }) {
  return (
    <Card>
      <MDBox
        p={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <MDBox display="flex" alignItems="center" gap={2}>
          <MDAvatar
            src={user.avatarUrl || "https://via.placeholder.com/150"}
            alt="Profile Picture"
            size="xl"
            shadow="sm"
          />
          <MDBox>
            <MDTypography variant="h4" fontWeight="medium">
              {user.fullName}
            </MDTypography>
            <MDTypography variant="body2" color="text">
              {`Usuario desde ${user.joinDate} • ${user.planName}`}
            </MDTypography>
            <MDBox display="flex" mt={1} gap={1}>
              <Tooltip title="Facebook">
                <IconButton size="small" color="info">
                  <FacebookIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Twitter">
                <IconButton size="small" color="info">
                  <TwitterIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton size="small" color="info">
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox display="flex" mt={{ xs: 2, sm: 0 }} gap={1}>
          <Button variant="outlined" color="info" startIcon={<EditIcon />}>
            Editar perfil
          </Button>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Definir PropTypes para validar props
UserProfileHeader.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    joinDate: PropTypes.string.isRequired,
    planName: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileHeader;
