import React from "react";

// MUI
import Box from "@mui/material/Box";

import PublicRoute from "./PublicRoute";

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const PublicRouteWrapper = ({ isAuthenticated, setIsAuthenticated }: Props) => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PublicRoute
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Box>
  );
};

export default PublicRouteWrapper;
