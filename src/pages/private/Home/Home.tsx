import { Button, Typography, Box, Container } from "@mui/material";
import React from "react";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "src/app-configs/app.config";

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const Home = ({ setIsAuthenticated }: Props) => {
  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    // Update authentication state immediately
    setIsAuthenticated(false);
    // Dispatch custom event for cross-tab logout detection
    window.dispatchEvent(new Event("tokenChanged"));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4" gutterBottom>
          ✅ Welcome! User is logged in
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          This is the home page content.
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
