import { SxProps, Theme } from "@mui/material/styles";

export const signInStyles = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
  } as SxProps<Theme>,

  container: {
    maxWidth: 1200,
    width: "100%",
    height: 600,
    display: "flex",
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  } as SxProps<Theme>,

  leftSection: {
    flex: "0 0 60%",
    background:
      "linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
    },
  } as SxProps<Theme>,

  rightSection: {
    flex: "0 0 40%",
    backgroundColor: "#f5f7fa",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
  } as SxProps<Theme>,

  logoContainer: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    mb: 4,
  } as SxProps<Theme>,

  logo: {
    fontSize: "3rem",
    color: "white",
    mb: 2,
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
  } as SxProps<Theme>,

  title: {
    color: "white",
    fontWeight: 700,
    fontSize: "2.5rem",
    mb: 2,
    textAlign: "center",
    position: "relative",
    zIndex: 1,
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  } as SxProps<Theme>,

  tagline: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "1.2rem",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
  } as SxProps<Theme>,

  formContainer: {
    width: "100%",
    maxWidth: 400,
  } as SxProps<Theme>,

  formCard: {
    p: 4,
    borderRadius: 2,
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    backgroundColor: "white",
  } as SxProps<Theme>,

  formTitle: {
    color: "text.primary",
    fontWeight: 600,
    fontSize: "1.8rem",
    mb: 3,
    textAlign: "center",
  } as SxProps<Theme>,

  form: {
    width: "100%",
  } as SxProps<Theme>,

  submitButton: {
    mt: 3,
    mb: 2,
    py: 1.5,
    fontSize: "1.1rem",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 2,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "&:hover": {
      background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
    },
    transition: "all 0.3s ease",
    color: "white !important",
  } as SxProps<Theme>,

  textField: {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "primary.main",
        borderWidth: 2,
      },
    },
  } as SxProps<Theme>,
};
