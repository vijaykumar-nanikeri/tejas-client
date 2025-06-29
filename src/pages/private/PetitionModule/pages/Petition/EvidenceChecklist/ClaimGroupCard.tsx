import React, { useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Alert,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/stores/hooks";
import {
  setUploading,
  setUploadProgress,
  updateClaimStatus,
} from "src/stores/slices/claimsSlice";
import ClaimChecklistCard from "./ClaimChecklistCard";
import FileUploadService from "src/services/FileUploadService";

interface ClaimGroupCardProps {
  onShowQualityReview: () => void;
}

export default function ClaimGroupCard({
  onShowQualityReview,
}: ClaimGroupCardProps) {
  const dispatch = useAppDispatch();
  const { claims, isUploading, uploadProgress } = useAppSelector(
    (state) => state.claims
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleSubmitClick = () => {
    // Check if any claims have files
    const claimsWithFiles = claims.filter((claim) => claim.files.length > 0);

    if (claimsWithFiles.length === 0) {
      setUploadError("Please upload at least one file before submitting.");
      return;
    }

    setOpenDialog(true);
    setUploadError(null);
  };

  const handleConfirmSubmit = async () => {
    setOpenDialog(false);
    setUploadError(null);

    try {
      dispatch(setUploading(true));
      dispatch(setUploadProgress(0));

      // Simulate progress updates
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 10;
        if (currentProgress >= 90) {
          clearInterval(progressInterval);
          currentProgress = 90;
        }
        dispatch(setUploadProgress(currentProgress));
      }, 200);

      const uploadService = FileUploadService.getInstance();
      const result = await uploadService.uploadClaimFiles(claims);

      clearInterval(progressInterval);
      dispatch(setUploadProgress(100));

      if (result.success) {
        // Update all claim statuses to uploaded
        claims.forEach((_, index) => {
          if (claims[index].files.length > 0) {
            dispatch(
              updateClaimStatus({ claimIndex: index, status: "uploaded" })
            );
          }
        });

        // Show success message and proceed to quality review
        setTimeout(() => {
          onShowQualityReview();
        }, 1000);
      } else {
        setUploadError(result.message);
        // Update claim statuses to error
        claims.forEach((_, index) => {
          if (claims[index].files.length > 0) {
            dispatch(updateClaimStatus({ claimIndex: index, status: "error" }));
          }
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("An unexpected error occurred during upload.");
      // Update claim statuses to error
      claims.forEach((_, index) => {
        if (claims[index].files.length > 0) {
          dispatch(updateClaimStatus({ claimIndex: index, status: "error" }));
        }
      });
    } finally {
      dispatch(setUploading(false));
    }
  };

  const handleCancelSubmit = () => {
    setOpenDialog(false);
    setUploadError(null);
  };

  const totalFiles = claims.reduce(
    (total, claim) => total + claim.files.length,
    0
  );
  const claimsWithFiles = claims.filter((claim) => claim.files.length > 0);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 1400,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          background: "#fafbfc",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 3,
            textAlign: "left",
            color: "primary.main",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            letterSpacing: 0.5,
          }}
        >
          Claims & Checklist - Action Items
        </Typography>

        {uploadError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {uploadError}
          </Alert>
        )}

        {isUploading && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Uploading files... {uploadProgress}%
            </Typography>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}

        <Grid container spacing={2}>
          {claims.map((__, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <ClaimChecklistCard claimIndex={idx} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              mb: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total files: {totalFiles} | Claims with files:{" "}
              {claimsWithFiles.length}
            </Typography>
            <Button
              onClick={handleSubmitClick}
              variant="contained"
              disabled={isUploading || totalFiles === 0}
              sx={{
                fontWeight: 600,
                px: 1.5,
                py: 0.5,
              }}
            >
              {isUploading ? "Uploading..." : "Submit Claim"}
            </Button>
          </Box>
        </Box>
      </Card>

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
          Confirm Evidence Submission
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Are you sure you want to submit the evidence files?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Total files to upload: {totalFiles}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Claims with files: {claimsWithFiles.length}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCancelSubmit}
            variant="outlined"
            disabled={isUploading}
            sx={{
              fontWeight: 500,
              px: 2,
              py: 0.5,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            variant="contained"
            disabled={isUploading}
            sx={{
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          >
            {isUploading ? "Uploading..." : "Yes, Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
