import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
} from "@mui/material";

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

function App({ setIsAuthenticated }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      localStorage.setItem("token", "demo-token");

      // Update authentication state immediately
      setIsAuthenticated(true);

      // Dispatch custom event for cross-tab detection
      window.dispatchEvent(new Event("tokenChanged"));
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "4rem" }}>
      <Box component="form" noValidate autoComplete="off">
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={!username.trim() || !password.trim()}
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default App;
