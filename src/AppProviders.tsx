import React from "react";

// Packages
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Styles
import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
  // Create a basic theme
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* Global components - STARTS >> */}
        <ToastContainer
          closeOnClick
          // position "bottom-center" allows us to have the correct slide in animation
          position="bottom-center"
          newestOnTop={false}
          hideProgressBar
          className="Toastify__toast-container-custom"
          // bodyClassName="Toastify__toast-body-custom"
        />
        {/* << ENDS - Global components */}
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
