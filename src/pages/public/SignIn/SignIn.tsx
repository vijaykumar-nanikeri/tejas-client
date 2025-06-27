import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import AxiosClient from "src/services/AxiosClient/AxiosClient";
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from "src/app-configs/app.config";

type Props = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

interface LoginResponse {
  statusCode: number;
  statusMessage: string;
  authToken: string;
  data: Array<{
    id: number;
    mobileNo: string;
    name: string;
    userCategoryId: number;
    userCategory: string;
  }>;
}

function App({ setIsAuthenticated }: Props) {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!mobileNo.trim() || !password.trim()) {
      setError("Please enter both mobile number and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await AxiosClient.getInstance().post("/login", {
        mobileNo: mobileNo.trim(),
        password: password,
      });

      const responseData = response.data as LoginResponse;

      console.log("vvv-responseData: ", responseData);

      if (responseData.statusCode === 200) {
        // Store the auth token
        localStorage.setItem(AUTH_TOKEN_KEY, responseData.authToken);

        // Store user data if needed
        if (responseData.data && responseData.data.length > 0) {
          const userData = responseData.data[0];
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        }

        // Update authentication state
        setIsAuthenticated(true);

        // Dispatch custom event for cross-tab detection
        window.dispatchEvent(new Event("tokenChanged"));
      } else {
        setError(responseData.statusMessage || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          setError("Invalid mobile number or password");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(error.response.data?.statusMessage || "Login failed");
        }
      } else if (error.request) {
        // Network error
        setError("Network error. Please check your connection.");
      } else {
        // Other error
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "4rem" }}>
      <Box component="form" noValidate autoComplete="off">
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            inputProps={{
              maxLength: 10,
              pattern: "[0-9]*",
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={!mobileNo.trim() || !password.trim() || loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default App;
