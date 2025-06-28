import { SxProps, Theme } from "@mui/material";

export const headerStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 3,
    backgroundColor: "background.paper",
    borderBottom: "1px solid",
    borderColor: "divider",
    mb: 3,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  backButton: {
    color: "primary.main",
    "&:hover": {
      backgroundColor: "action.hover",
    },
  },
  petitionInfo: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    px: 2,
    py: 1,
    backgroundColor: "primary.main",
    color: "primary.contrastText",
    borderRadius: 2,
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  documentIcon: {
    fontSize: "1rem",
    color: "primary.contrastText",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  printButton: {
    color: "primary.main",
    "&:hover": {
      backgroundColor: "action.hover",
    },
  },
} as Record<string, SxProps<Theme>>;
