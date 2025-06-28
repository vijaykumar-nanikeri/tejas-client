import { SxProps, Theme } from "@mui/material";

export const evidenceStrengthAnalysisStyles = {
  container: {
    mb: 3,
  },
  sectionTitle: {
    fontWeight: 600,
    color: "text.primary",
    mb: 1,
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: 1,
    justifyContent: "center",
  },
  titleIcon: {
    color: "primary.main",
    fontSize: "1.2rem",
  },
  tableContainer: {
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    "& .MuiTableCell-root": {
      borderBottom: "1px solid",
      borderColor: "divider",
      padding: "12px 16px",
      fontSize: "0.875rem",
    },
  },
  tableHead: {
    backgroundColor: "#C5CAE9",
    "& .MuiTableCell-root": {
      color: "text.primary",
      fontWeight: 600,
      fontSize: "0.8rem",
      letterSpacing: 0.5,
      borderBottom: "none",
    },
  },
  tableBody: {
    "& .MuiTableRow-root:nth-of-type(even)": {
      backgroundColor: "grey.50",
    },
    "& .MuiTableRow-root:hover": {
      backgroundColor: "action.hover",
    },
  },
  serialNumberCell: {
    width: "60px",
    textAlign: "center",
    fontWeight: 600,
    color: "text.primary",
  },
  metricCell: {
    fontWeight: 500,
    color: "text.primary",
  },
  scoreCell: {
    width: "120px",
    textAlign: "center",
  },
  noDataContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    padding: "16px",
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
    marginTop: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  noDataText: {
    color: "text.secondary",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
  noDataIcon: {
    fontSize: "1.2rem",
    color: "text.secondary",
  },
  ratingsContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 3,
    mt: 2,
    p: 2,
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 2,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  ratingItem: {
    width: "30%",
  },
  ratingLabel: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "text.primary",
    mb: 1,
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    "& .MuiLinearProgress-bar": {
      borderRadius: 4,
    },
  },
  scoreText: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "text.primary",
    minWidth: "40px",
    textAlign: "right",
  },
} as Record<string, SxProps<Theme>>;
