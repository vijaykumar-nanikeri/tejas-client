import React from "react";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "grey.100",
        m: 0,
        p: 0,
        overflow: "auto",
      }}
    >
      <TopNavBar setIsAuthenticated={setIsAuthenticated} />

      {/* Main content area with proper spacing */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 16, // Much more top padding to account for navbar height
          minHeight: "calc(100vh - 128px)", // Adjusted for navbar height
          bgcolor: "grey.100", // Slightly darker background color
          m: 0,
          p: 0,
          overflow: "auto",
        }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            m: 0,
            p: 0,
            mt: "56px",
            height: "100%",
          }}
        >
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default PrivateRouteWrapper;
