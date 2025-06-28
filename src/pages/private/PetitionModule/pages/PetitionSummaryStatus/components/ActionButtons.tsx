import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
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
  const [openDialog, setOpenDialog] = useState(false);

  const handleDownloadPDF = () => {
    console.log("Downloading as PDF...");
    onDownloadPDF?.();
  };

  const handleSubmitToSP = () => {
    console.log("Submitting to SP...");
    onSubmitToSP?.();
  };

  const handleGenerateReportClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmGenerateReport = () => {
    setOpenDialog(false);
    console.log("Generating petition report...");
    onGenerateReport?.();
  };

  const handleCancelGenerateReport = () => {
    setOpenDialog(false);
  };

  return (
    <>
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
            onClick={handleGenerateReportClick}
            sx={petitionSummaryStyles.actionButton}
          >
            Generate Petition Report
          </Button>
        </Stack>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => {}} // Disable backdrop click
        disableEscapeKeyDown
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "text.primary",
            pb: 1,
          }}
        >
          Confirm Generating Petition Report
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Are you sure to generate petition report?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1, justifyContent: "flex-end" }}>
          <Button
            onClick={handleCancelGenerateReport}
            variant="outlined"
            sx={{
              fontWeight: 500,
              px: 2,
              py: 0.5,
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmGenerateReport}
            variant="contained"
            sx={{
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          >
            Yes, Generate Petition Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionButtons;
