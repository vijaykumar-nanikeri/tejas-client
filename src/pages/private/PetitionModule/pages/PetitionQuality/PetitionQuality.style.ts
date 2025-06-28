import { SxProps, Theme } from "@mui/material/styles";

export const petitionQualityStyles = {
  container: {
    p: 2,
  } as SxProps<Theme>,

  card: {
    width: "100%",
    borderRadius: 2,
    boxShadow: 2,
  } as SxProps<Theme>,

  cardContent: {
    p: 3,
  } as SxProps<Theme>,

  title: {
    fontWeight: 600,
    mb: 3,
    color: "primary.main",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    letterSpacing: 0.5,
  } as SxProps<Theme>,

  claimSection: {
    mb: 2,
  } as SxProps<Theme>,

  claimTitle: {
    fontWeight: 600,
    color: "text.primary",
    mb: 1,
  } as SxProps<Theme>,

  divider: {
    my: 3,
    borderColor: "#e0e0e0",
  } as SxProps<Theme>,

  alert: {
    mt: 2,
    mb: 2,
    "& .MuiAlert-message": {
      width: "100%",
      flex: 1,
      wordWrap: "break-word",
    },
    "& .MuiAlert-action": {
      alignItems: "flex-start",
      paddingTop: 1,
    },
  } as SxProps<Theme>,

  actionButtons: {
    direction: "row",
    spacing: 1,
  } as SxProps<Theme>,

  actionButton: {
    textTransform: "capitalize",
    fontWeight: 600,
    whiteSpace: "nowrap",
  } as SxProps<Theme>,
};
