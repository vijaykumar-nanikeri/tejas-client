import { SxProps, Theme } from "@mui/material";

export const fileSelectionStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    width: "100%",
    maxWidth: 800,
    borderRadius: 3,
    boxShadow: 3,
    background: "#fafbfc",
  },
  cardContent: {
    p: 3,
  },
  stackBox: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  radioGroup: {
    display: "flex",
    gap: 2,
  },
  uploadPaper: (selectedFile: File | null): SxProps<Theme> => ({
    p: 2,
    border: selectedFile ? "2px solid #4caf50" : "2px dashed #ccc",
    borderRadius: 2,
    backgroundColor: selectedFile ? "#f1f8e9" : "#fafafa",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: selectedFile ? "#4caf50" : "#999",
      backgroundColor: selectedFile ? "#f1f8e9" : "#f5f5f5",
    },
  }),
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  chooseFileButton: {
    fontWeight: 600,
    px: 3,
    py: 1.5,
  },
};
