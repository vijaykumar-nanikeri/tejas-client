import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Container,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Phone,
  Lock,
  Security,
} from "@mui/icons-material";
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
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        p: 0,
        m: 0,
      }}
    >
      {/* Left Section - Branding (60%) - Dark Purple Gradient at Bottom */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 4,
          background:
            "linear-gradient(to bottom, #2c1810 0%, #4a148c 70%, #6a1b9a 100%)",
        }}
      >
        {/* Tejas Logo */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            boxShadow: 3,
          }}
        >
          <Security
            sx={{
              fontSize: 60,
              color: "white",
            }}
          />
        </Box>

        {/* Tagline */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            mb: 2,
            textShadow: 1,
          }}
        >
          TEJAS
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            mb: 3,
            fontWeight: 300,
            maxWidth: 600,
            lineHeight: 1.4,
          }}
        >
          Triage of Evidence and Justification Automation System
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            fontWeight: 300,
          }}
        >
          Empowering Law Enforcement with AI-Driven Intelligence
        </Typography>
      </Box>

      {/* Right Section - Sign In Form (40%) - Better Contrast Background */}
      <Box
        sx={{
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          bgcolor: "#f8fafc",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 1,
                color: "text.primary",
              }}
            >
              SignIn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              for duty
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                maxLength: 10,
                pattern: "[0-9]*",
              }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
              disabled={!mobileNo.trim() || !password.trim() || loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Security />
                )
              }
              sx={{
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
