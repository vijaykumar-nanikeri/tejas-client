import { SxProps, Theme } from "@mui/material";

export const enquiryReportSummaryStyles = {
  container: {
    mb: 3,
  },
  sectionTitle: {
    fontWeight: 600,
    color: "text.primary",
    mb: 1,
    fontSize: "0.95rem",
  },
  card: {
    padding: "16px",
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  taglineContainer: {
    mb: 1,
  },
  taglineChip: {
    backgroundColor: "primary.50",
    borderColor: "primary.200",
    color: "primary.700",
    fontSize: "0.75rem",
    fontWeight: 500,
    "& .MuiChip-icon": {
      color: "primary.600",
      fontSize: "0.9rem",
    },
  },
  contentContainer: {
    position: "relative",
  },
  contentText: {
    color: "text.secondary",
    fontSize: "0.875rem",
    lineHeight: 1.6,
    maxHeight: "4.5em", // 3 lines (1.5em * 3)
    overflow: "auto",
    paddingRight: "8px",
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(0, 0, 0, 0.2)",
      borderRadius: "2px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "rgba(0, 0, 0, 0.3)",
    },
  },
  scrollIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "background.paper",
    padding: "4px 8px",
    borderRadius: "4px 0 4px 0",
    boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.1)",
    transition: "opacity 0.2s ease",
    "&:hover": {
      opacity: 0,
    },
  },
  scrollText: {
    fontSize: "0.7rem",
    color: "text.secondary",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
} as Record<string, SxProps<Theme>>;
