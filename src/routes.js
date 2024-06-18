import React from "react";
import Icon from "@mui/material/Icon";
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SignOut from "layouts/authentication/sign-out";
import Redirector from "layouts/redirector";
const routes = [
  {
    type: "collapse",
    name: "Links",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: Tables,
    protected: true,
    showInSidebar: true,
  },
  {
    type: "collapse",
    name: "LinkPortal",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: Dashboard,
    protected: true,
    showInSidebar: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: Profile,
    protected: true,
    showInSidebar: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: SignIn,
    protected: false,
    showInSidebar: false,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: SignUp,
    protected: false,
    showInSidebar: false,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-out",
    component: SignOut,
    protected: true,
    showInSidebar: true,
  },
  {
    type: "collapse",
    name: "Redirector",
    key: "redirector",
    route: "/redirect/:link",
    icon: <Icon fontSize="small">login</Icon>,
    component: Redirector,
    protected: false,
    showInSidebar: false,
  },
];

export default routes;
