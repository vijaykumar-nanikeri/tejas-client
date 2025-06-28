import React from "react";
import { useForm, Controller } from "react-hook-form";
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
  Card,
  CardContent,
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
import { signInStyles } from "./SignIn.style";

// TypeScript interfaces
interface SignInFormData {
  mobileNo: string;
  password: string;
}

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

interface SignInProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

// Form validation rules
const formValidationRules = {
  mobileNo: {
    required: "Mobile number is required",
    pattern: {
      value: /^[0-9]{10}$/,
      message: "Please enter a valid 10-digit mobile number",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  },
};

const SignIn: React.FC<SignInProps> = ({ setIsAuthenticated }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    mode: "onChange",
    defaultValues: {
      mobileNo: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: SignInFormData): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      const response = await AxiosClient.getInstance().post("/login", {
        mobileNo: data.mobileNo.trim(),
        password: data.password,
      });

      const responseData = response.data as LoginResponse;

      console.log("Login response:", responseData);

      if (responseData.statusCode === 200) {
        // Store authentication data
        localStorage.setItem(AUTH_TOKEN_KEY, responseData.authToken);

        if (responseData.data?.[0]) {
          const userData = responseData.data[0];
          localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        }

        // Update authentication state
        setIsAuthenticated(true);
        window.dispatchEvent(new Event("tokenChanged"));
      } else {
        setError(responseData.statusMessage || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      handleLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login errors
  const handleLoginError = (error: any): void => {
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401:
          setError("Invalid mobile number or password");
          break;
        case 500:
          setError("Server error. Please try again later.");
          break;
        default:
          setError(error.response.data?.statusMessage || "Login failed");
      }
    } else if (error.request) {
      setError("Network error. Please check your connection.");
    } else {
      setError("An unexpected error occurred");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter" && !isLoading && isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <Container maxWidth={false} sx={signInStyles.root}>
      <Box sx={signInStyles.container}>
        {/* Left Section - Branding (60%) */}
        <Box sx={signInStyles.leftSection}>
          {/* Tejas Logo */}
          <Box sx={signInStyles.logoContainer}>
            <Security sx={signInStyles.logo} />
          </Box>

          {/* Tagline */}
          <Typography variant="h2" sx={signInStyles.title}>
            TEJAS
          </Typography>

          <Typography variant="h5" sx={signInStyles.tagline}>
            Triage of Evidence and Justification Automation System
          </Typography>

          {/* Subtitle */}
          <Typography variant="body1" sx={signInStyles.tagline}>
            Empowering Law Enforcement with AI-Driven Intelligence
          </Typography>
        </Box>

        {/* Right Section - Sign In Form (40%) */}
        <Box sx={signInStyles.rightSection}>
          <Box sx={signInStyles.formContainer}>
            <Card sx={signInStyles.formCard}>
              <CardContent>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography variant="h4" sx={signInStyles.formTitle}>
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

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Stack spacing={3}>
                    {/* Mobile Number Field */}
                    <Controller
                      name="mobileNo"
                      control={control}
                      rules={formValidationRules.mobileNo}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          disabled={isLoading}
                          error={!!errors.mobileNo}
                          helperText={errors.mobileNo?.message}
                          sx={signInStyles.textField}
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
                          onKeyPress={handleKeyPress}
                        />
                      )}
                    />

                    {/* Password Field */}
                    <Controller
                      name="password"
                      control={control}
                      rules={formValidationRules.password}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Password"
                          variant="outlined"
                          type={showPassword ? "text" : "password"}
                          fullWidth
                          disabled={isLoading}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                          sx={signInStyles.textField}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                                  disabled={isLoading}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onKeyPress={handleKeyPress}
                        />
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={!isValid || isLoading}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Security />
                        )
                      }
                      sx={signInStyles.submitButton}
                    >
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
