import React from "react";
import { useSelector } from "react-redux";
import Icon from "@mui/material/Icon";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import { useNavigate } from "react-router-dom";
function isAuthenticated() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  console.log("Estado de autenticación:", isAuthenticated);
  if (!isAuthenticated) {
    navigate("/authentication/sign-in");
    return false;
  }
  return true;
}
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    // Renderiza el componente solo si el usuario está autenticado
    renderCondition: isAuthenticated(),
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
    // Renderiza el componente solo si el usuario está autenticado
    renderCondition: isAuthenticated,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
    // Renderiza el componente solo si el usuario está autenticado
    renderCondition: isAuthenticated,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
    // Renderiza el componente solo si el usuario está autenticado
    renderCondition: isAuthenticated,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
    // Renderiza el componente solo si el usuario está autenticado
    renderCondition: isAuthenticated,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
    // Renderiza el componente solo si el usuario está autenticado
    renderCondition: isAuthenticated,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    // Renderiza el componente solo si el usuario no está autenticado
    renderCondition: !isAuthenticated,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
    // Renderiza el componente solo si el usuario no está autenticado
    renderCondition: () => !isAuthenticated,
  },
];

export default routes;
