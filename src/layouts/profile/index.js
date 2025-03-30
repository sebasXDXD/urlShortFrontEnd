import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Custom components
import UserProfileHeader from "./components/UserProfileHeader";
import ProfileInfo from "./components/ProfileInfo";
import ActivitySummary from "./components/ActivitySummary";
import SecuritySettings from "./components/SecuritySettings";
import CustomDomains from "./components/CustomDomains";
import SubscriptionPlans from "./components/SubscriptionPlans";
import PlatformSettings from "./components/PlatformSettings";

// Mock data
const userData = {
  fullName: "Carlos Rodríguez",
  avatarUrl: "https://via.placeholder.com/150",
  joinDate: "Mayo 2023",
  planName: "Plan Pro",
};

const userInfo = {
  firstName: "Carlos",
  lastName: "Rodríguez",
  email: "carlos.rodriguez@ejemplo.com",
  company: "MiEmpresa S.A.",
  country: "España",
  phone: "+34 600 123 456",
};

const activityStats = {
  urlsCreated: 357,
  urlsLimit: 500,
  totalClicks: 12845,
  popularUrl: "acorta.do/x8j2a",
  popularUrlClicks: 2451,
  lastAccess: "28 marzo, 2025 - 18:42",
};

const plans = [
  {
    id: "free",
    name: "Plan Gratuito",
    price: "$0",
    features: [
      "500 URLs acortadas/mes",
      "Estadísticas básicas",
      "Dominio estándar",
      "Soporte por email",
    ],
  },
  {
    id: "pro",
    name: "Plan Pro",
    price: "$29.99/mes",
    features: [
      "URLs ilimitadas",
      "Estadísticas avanzadas",
      "1 dominio personalizado",
      "Sin marca en enlaces",
      "Soporte prioritario",
    ],
  },
  {
    id: "enterprise",
    name: "Plan Empresarial",
    price: "$99.99/mes",
    features: [
      "URLs ilimitadas",
      "Estadísticas avanzadas",
      "5 dominios personalizados",
      "API acceso completo",
      "Integración con herramientas",
      "Soporte 24/7",
    ],
  },
];

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox mt={5} mb={3}>
        <Grid container spacing={3}>
          {/* User Profile Header */}
          <Grid item xs={12}>
            <UserProfileHeader user={userData} />
          </Grid>

          {/* Platform Settings */}
          <Grid item xs={12} md={6} lg={3}>
            <PlatformSettings />
          </Grid>

          {/* Profile Information */}
          <Grid item xs={12} md={6} lg={5}>
            <ProfileInfo userInfo={userInfo} />
          </Grid>

          {/* Stats Summary */}
          <Grid item xs={12} md={12} lg={4}>
            <ActivitySummary stats={activityStats} />
          </Grid>

          {/* Security Settings */}
          <Grid item xs={12} md={6}>
            <SecuritySettings />
          </Grid>

          {/* Domains Settings */}
          <Grid item xs={12} md={6}>
            <CustomDomains domain="acorta.do" />
          </Grid>

          {/* Subscription Plans */}
          <Grid item xs={12}>
            <SubscriptionPlans plans={plans} currentPlanId="pro" />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
