import { SxProps, Theme } from "@mui/material/styles";

export const finalEvaluationReportStyles = {
  container: {
    p: 2,
    width: "100%",
  } as SxProps<Theme>,

  content: {
    mt: 3,
  } as SxProps<Theme>,

  section: {
    mb: 3,
  } as SxProps<Theme>,

  sectionTitle: {
    fontWeight: 600,
    mb: 2,
    color: "primary.main",
    fontSize: "1.1rem",
  } as SxProps<Theme>,

  card: {
    width: "100%",
    borderRadius: 2,
    boxShadow: 2,
  } as SxProps<Theme>,

  cardContent: {
    p: 3,
  } as SxProps<Theme>,
};
