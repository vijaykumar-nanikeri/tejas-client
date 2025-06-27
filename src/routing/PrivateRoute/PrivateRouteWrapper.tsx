import React from "react";

import { Navigate } from "react-router-dom";

// MUI
import Container from "@mui/material/Container";

// Global components
import TopNavBar from "src/layout/NavBars/components/TopNavBar/TopNavBar";

// Local components
import PrivateRoute from "./PrivateRoute";
import { loginPath } from "../routes";

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const PrivateRouteWrapper = ({
  isAuthenticated,
  setIsAuthenticated,
}: Props) => {
  if (!isAuthenticated) {
    return <Navigate to={loginPath} />;
  }

  return (
    <>
      <TopNavBar setIsAuthenticated={setIsAuthenticated} />

      {/* The <main /> section */}
      <Container component="main" maxWidth={false} disableGutters>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Container>
    </>
  );
};

export default PrivateRouteWrapper;
