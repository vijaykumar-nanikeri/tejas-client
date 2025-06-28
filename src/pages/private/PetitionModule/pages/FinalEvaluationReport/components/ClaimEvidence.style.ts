import { SxProps, Theme } from "@mui/material";

export const claimEvidenceStyles = {
  container: {
    mb: 3,
  },
  sectionTitle: {
    fontWeight: 600,
    color: "text.primary",
    mb: 2,
    fontSize: "0.95rem",
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
    minWidth: 650,
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
  claimCell: {
    fontWeight: 500,
    color: "text.primary",
  },
  evidenceCell: {
    width: "120px",
    textAlign: "center",
  },
  documentCell: {
    color: "text.secondary",
    fontSize: "0.8rem",
    lineHeight: 1.4,
  },
  summaryCell: {
    color: "text.secondary",
    fontSize: "0.8rem",
    lineHeight: 1.4,
  },
  noDataRow: {
    "& .MuiTableCell-root": {
      borderBottom: "none",
      padding: "40px 16px",
    },
  },
  noDataCell: {
    textAlign: "center",
    color: "text.secondary",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  noDataIcon: {
    fontSize: "1.2rem",
    color: "text.secondary",
  },
} as Record<string, SxProps<Theme>>;
