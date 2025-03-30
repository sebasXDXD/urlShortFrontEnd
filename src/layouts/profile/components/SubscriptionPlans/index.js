import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PaymentIcon from "@mui/icons-material/Payment";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function SubscriptionPlans({ plans, currentPlanId }) {
  return (
    <Card>
      <MDBox p={3}>
        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
          <PaymentIcon color="info" />
          <MDTypography variant="h6" fontWeight="medium">
            Planes de Suscripción
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox mt={3}>
          <Grid container spacing={3}>
            {plans.map((plan) => {
              const isCurrent = plan.id === currentPlanId;
              return (
                <Grid item xs={12} md={4} key={plan.id}>
                  <Card
                    sx={{
                      height: "100%",
                      border: isCurrent ? "2px solid #1A73E8" : "none",
                      boxShadow: isCurrent
                        ? "0 4px 20px 0 rgba(0,0,0,0.14)"
                        : "0 2px 8px 0 rgba(0,0,0,0.1)",
                    }}
                  >
                    <MDBox p={3} display="flex" flexDirection="column" height="100%">
                      {isCurrent && (
                        <MDBox
                          bgcolor="#1A73E8"
                          color="white"
                          borderRadius="lg"
                          py={0.5}
                          px={2}
                          width="fit-content"
                          mb={2}
                        >
                          <MDTypography variant="caption" color="white" fontWeight="medium">
                            Plan Actual
                          </MDTypography>
                        </MDBox>
                      )}
                      <MDTypography variant="h5" fontWeight="medium" mb={1}>
                        {plan.name}
                      </MDTypography>
                      <MDTypography variant="h3" fontWeight="bold" mb={2}>
                        {plan.price}
                      </MDTypography>
                      <Divider />
                      <MDBox my={2} flex="1">
                        {plan.features.map((feature) => (
                          <MDBox key={feature.id} display="flex" alignItems="center" mb={1}>
                            <MDBox
                              component="span"
                              bgcolor="#1A73E8"
                              width={6}
                              height={6}
                              borderRadius="50%"
                              mr={1}
                            />
                            <MDTypography variant="body2">{feature.name}</MDTypography>
                          </MDBox>
                        ))}
                      </MDBox>
                      <Button
                        variant={isCurrent ? "outlined" : "contained"}
                        color="info"
                        fullWidth
                        disabled={isCurrent}
                      >
                        {isCurrent ? "Plan Actual" : "Cambiar a este Plan"}
                      </Button>
                    </MDBox>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Definir PropTypes para validar las props
SubscriptionPlans.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  currentPlanId: PropTypes.string.isRequired,
};

export default SubscriptionPlans;
