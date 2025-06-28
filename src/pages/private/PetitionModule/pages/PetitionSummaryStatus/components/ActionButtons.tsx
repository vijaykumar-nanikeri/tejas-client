import React from "react";
import { Box, Button, Stack } from "@mui/material";
import {
  Download as DownloadIcon,
  Send as SendIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { petitionSummaryStyles } from "../PetitionSummaryStatus.style";

interface ActionButtonsProps {
  onDownloadPDF?: () => void;
  onSubmitToSP?: () => void;
  onGenerateReport?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDownloadPDF,
  onSubmitToSP,
  onGenerateReport,
}) => {
  const handleDownloadPDF = () => {
    console.log("Downloading as PDF...");
    onDownloadPDF?.();
  };

  const handleSubmitToSP = () => {
    console.log("Submitting to SP...");
    onSubmitToSP?.();
  };

  const handleGenerateReport = () => {
    console.log("Generating petition report...");
    onGenerateReport?.();
  };

  return (
    <Box sx={petitionSummaryStyles.actionButtonsContainer}>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
          sx={petitionSummaryStyles.actionButton}
        >
          Download as PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<SendIcon />}
          onClick={handleSubmitToSP}
          sx={petitionSummaryStyles.actionButton}
        >
          Submit to SP
        </Button>
        <Button
          variant="contained"
          startIcon={<DescriptionIcon />}
          onClick={handleGenerateReport}
          sx={petitionSummaryStyles.actionButton}
        >
          Generate Petition Report
        </Button>
      </Stack>
    </Box>
  );
};

export default ActionButtons;
