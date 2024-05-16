import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={
        <Fragment>{isAuthenticated() ? <Component /> : <Navigate to="/login" replace />}</Fragment>
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
