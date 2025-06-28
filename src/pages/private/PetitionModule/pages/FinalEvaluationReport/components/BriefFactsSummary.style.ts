import { SxProps, Theme } from "@mui/material";

export const briefFactsSummaryStyles = {
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
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  titleIcon: {
    color: "primary.main",
    fontSize: "1.2rem",
  },
  summaryContainer: {
    backgroundColor: "grey.50",
    border: "1px solid",
    borderColor: "grey.200",
    borderRadius: 2,
    p: 2.5,
    minHeight: "95px", // Increased height
    maxHeight: "95px", // Maximum height increased
    overflow: "auto",
    position: "relative",
    transition: "all 0.3s ease",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "4px",
      backgroundColor: "primary.main",
      borderRadius: "2px 0 0 2px",
    },
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "grey.100",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "primary.main",
      borderRadius: "3px",
      "&:hover": {
        backgroundColor: "primary.dark",
      },
    },
  },
  summaryText: {
    color: "text.primary",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    margin: 0,
    paddingLeft: 1,
    fontWeight: 400,
    letterSpacing: 0.2,
  },
  scrollIndicator: {
    position: "absolute",
    bottom: 4,
    right: 4,
    fontSize: "0.7rem",
    color: "text.secondary",
    backgroundColor: "background.paper",
    px: 1,
    py: 0.5,
    borderRadius: 1,
    border: "1px solid",
    borderColor: "divider",
    opacity: 0.8,
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
  },
  summaryContainerHover: {
    "&:hover .scroll-indicator": {
      opacity: 0,
    },
  },
} as Record<string, SxProps<Theme>>;
