import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import routes from "./routes";

function AppRouter() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.route}
          exact
          render={() => {
            // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir a la página de inicio de sesión
            if (route.renderCondition && !route.renderCondition()) {
              return <Navigate to="/authentication/sign-in" />;
            }
            // Si la ruta no requiere autenticación o el usuario está autenticado, mostrar el componente de la ruta correspondiente
            return <route.component />;
          }}
        />
      ))}
    </>
  );
}

export default AppRouter;
