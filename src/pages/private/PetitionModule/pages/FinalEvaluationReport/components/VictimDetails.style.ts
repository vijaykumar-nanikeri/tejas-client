import { SxProps, Theme } from "@mui/material";

export const victimDetailsStyles = {
  card: {
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: 2,
    mb: 2,
  },
  cardContent: {
    p: 3,
  },
  sectionTitle: {
    fontWeight: 600,
    color: "text.primary",
    mb: 2,
    fontSize: "0.95rem",
  },
  detailContainer: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "60px",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    px: 1,
    py: 1,
  },
  icon: {
    color: "primary.main",
    fontSize: "1.5rem",
    flexShrink: 0,
  },
  contentBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  label: {
    color: "text.secondary",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontSize: "0.7rem",
  },
  value: {
    color: "text.primary",
    fontWeight: 500,
    mt: 0.5,
    wordBreak: "break-word",
  },
  divider: {
    mx: 1,
    height: "40px",
    alignSelf: "center",
  },
} as Record<string, SxProps<Theme>>;
