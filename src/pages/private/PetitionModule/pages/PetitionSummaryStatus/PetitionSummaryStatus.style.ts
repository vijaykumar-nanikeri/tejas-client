import { SxProps, Theme } from "@mui/material/styles";

export const petitionSummaryStyles = {
  container: {
    p: 2,
  } as SxProps<Theme>,

  backButtonContainer: {
    mb: 2,
  } as SxProps<Theme>,

  backButton: {
    textTransform: "capitalize",
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
    textAlign: "left",
  } as SxProps<Theme>,

  claimsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 2,
  } as SxProps<Theme>,

  // ClaimSummary component styles
  claimCard: {
    borderRadius: 2,
    boxShadow: 1,
    border: "1px solid",
    borderColor: "divider",
  } as SxProps<Theme>,

  claimCardContent: {
    p: 2.5,
  } as SxProps<Theme>,

  claimTitle: {
    fontWeight: 600,
    color: "text.primary",
    mb: 2,
    fontSize: "1.1rem",
  } as SxProps<Theme>,

  claimDetailsContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 3,
    flexWrap: "wrap",
  } as SxProps<Theme>,

  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    minWidth: 200,
    flex: 1,
  } as SxProps<Theme>,

  detailHeader: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  } as SxProps<Theme>,

  detailIcon: {
    fontSize: "1.5rem",
  } as SxProps<Theme>,

  detailTitle: {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "text.primary",
  } as SxProps<Theme>,

  detailValue: {
    fontSize: "0.85rem",
    color: "text.secondary",
    lineHeight: 1.4,
  } as SxProps<Theme>,

  verticalDivider: {
    mx: 1,
    height: "auto",
    alignSelf: "stretch",
  } as SxProps<Theme>,

  aiStatusContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  } as SxProps<Theme>,

  statusChip: {
    fontWeight: 600,
    fontSize: "0.75rem",
    alignSelf: "flex-start",
  } as SxProps<Theme>,

  statusMessage: {
    fontSize: "0.8rem",
    color: "text.secondary",
    lineHeight: 1.4,
  } as SxProps<Theme>,

  divider: {
    my: 3,
    borderColor: "#e0e0e0",
  } as SxProps<Theme>,

  footer: {
    pt: 0,
  } as SxProps<Theme>,

  footerTitle: {
    fontWeight: 600,
    color: "primary.main",
    mb: 2,
    fontSize: "1.1rem",
  } as SxProps<Theme>,

  blockquote: {
    borderLeft: "4px solid",
    borderColor: "primary.main",
    pl: 3,
    py: 1,
    backgroundColor: "grey.50",
    borderRadius: 1,
  } as SxProps<Theme>,

  blockquoteText: {
    fontStyle: "italic",
    color: "text.secondary",
    lineHeight: 1.6,
    fontSize: "0.95rem",
  } as SxProps<Theme>,

  actionButtonsContainer: {
    mt: 3,
    display: "flex",
    justifyContent: "flex-end",
  } as SxProps<Theme>,

  actionButton: {
    fontWeight: 600,
    textTransform: "capitalize",
  } as SxProps<Theme>,

  // Legacy styles for backward compatibility
  claimBlock: {
    mb: 3,
  } as SxProps<Theme>,

  claimList: {
    py: 0,
  } as SxProps<Theme>,

  listItem: {
    px: 0,
    py: 1,
  } as SxProps<Theme>,

  listIcon: {
    minWidth: 40,
  } as SxProps<Theme>,

  listText: {
    "& .MuiListItemText-primary": {
      fontWeight: 600,
      fontSize: "0.9rem",
      color: "text.primary",
    },
    "& .MuiListItemText-secondary": {
      fontSize: "0.85rem",
      color: "text.secondary",
      mt: 0.5,
    },
  } as SxProps<Theme>,
};
