import React, { useEffect, useState } from "react";
import { useAuth } from "providers/AuthProvider";
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
import getFullProfile from "../../services/profile";

// Planes mock (esto sí puede quedar fijo)
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
  const { getToken } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.warn("No hay token, no se puede obtener el perfil.");
      return;
    }

    getFullProfile(token)
      .then((data) => {
        console.log("Perfil completo desde backend:", data);
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error al obtener perfil completo:", error);
      });
  }, [getToken]);

  if (!profile) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mt={10} textAlign="center">
          <p>Cargando perfil...</p>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  // 🔹 Mapear datos del backend al formato que esperan tus componentes
  const userData = {
    fullName: profile.fullName,
    avatarUrl: "https://via.placeholder.com/150", // si no tienes foto en backend
    joinDate: new Date(profile.joinDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    planName: profile.plan || "Plan Gratuito",
  };

  const userInfo = {
    firstName: profile.fullName.split(" ")[0],
    lastName: profile.fullName.split(" ").slice(1).join(" "),
    email: profile.email,
    company: profile.company || "No especificada",
    country: profile.country || "No especificado",
    phone: profile.phone || "No especificado",
  };

  const activityStats = {
    urlsCreated: profile.stats.urlsCreated,
    urlsLimit: profile.stats.urlsLimit,
    totalClicks: profile.stats.totalClicks,
    popularUrl: profile.stats.popularUrl || "N/A",
    popularUrlClicks: profile.stats.popularUrlClicks || 0,
    lastAccess:
      profile.stats.lastAccess === "01 Jan 0001 00:00" ? "Nunca" : profile.stats.lastAccess,
  };

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
            <SubscriptionPlans
              plans={plans}
              currentPlanId={profile.plan?.toLowerCase() || "free"}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
