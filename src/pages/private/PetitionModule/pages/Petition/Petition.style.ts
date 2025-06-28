import { SxProps, Theme } from "@mui/material/styles";

export const petitionStyles = {
  container: {
    p: 2,
    height: "100%",
  } as SxProps<Theme>,

  card: {
    height: "100%",
    m: 2,
  } as SxProps<Theme>,

  cardContent: {
    height: "100%",
    p: 3,
  } as SxProps<Theme>,

  radioGroup: {
    "& .MuiFormControlLabel-root": {
      flex: 1,
      margin: 0,
      border: "1px solid",
      borderColor: "divider",
      "&:not(:last-child)": {
        borderRight: "none",
      },
      "&:first-of-type": {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },
      "&:last-of-type": {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      },
    },
    "& .MuiRadio-root": {
      display: "none",
    },
    "& .MuiFormControlLabel-label": {
      width: "100%",
      textAlign: "center",
      py: 1,
      px: 2,
      cursor: "pointer",
    },
    "& .Mui-checked + .MuiFormControlLabel-label": {
      backgroundColor: "primary.main",
      color: "primary.contrastText",
    },
  } as SxProps<Theme>,

  uploadPaper: (selectedFile: File | null) =>
    ({
      p: 2,
      textAlign: "center",
      border: "2px dashed",
      borderColor: selectedFile ? "success.main" : "divider",
      backgroundColor: selectedFile ? "success.light" : "background.paper",
    } as SxProps<Theme>),

  chooseFileButton: {
    mb: 2,
  } as SxProps<Theme>,
};
