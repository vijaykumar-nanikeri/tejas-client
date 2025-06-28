import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { finalEvaluationReportStyles } from "./FinalEvaluationReport.style";

interface FinalEvaluationReportProps {
  onBack?: () => void;
}

const FinalEvaluationReport: React.FC<FinalEvaluationReportProps> = ({
  onBack,
}) => {
  return (
    <Box sx={finalEvaluationReportStyles.container}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        {onBack && (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              position: "absolute",
              left: 0,
              zIndex: 1,
            }}
          >
            Back to Summary
          </Button>
        )}
        <Typography
          variant="h6"
          sx={{
            width: "100%",
            textAlign: "center",
            fontWeight: 600,
            color: "primary.main",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            letterSpacing: 0.5,
          }}
        >
          Final Evaluation Report
        </Typography>
      </Box>

      {/* Content sections will be added here */}
      <Box sx={finalEvaluationReportStyles.content}>
        <Typography variant="body1" color="text.secondary">
          Final Evaluation Report content will be implemented section by
          section.
        </Typography>
      </Box>
    </Box>
  );
};

export default FinalEvaluationReport;
