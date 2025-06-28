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
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import ClaimChecklistCard from "./ClaimChecklistCard";

export default function ClaimGroupCard() {
  const { control, handleSubmit } = useFormContext();
  const { fields } = useFieldArray({ control, name: "claims" });
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmitClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmSubmit = () => {
    setOpenDialog(false);
    // Proceed with the actual submit action
    handleSubmit((data) => {
      console.log("Form Data:", data);
      // Add your submit logic here
    })();
  };

  const handleCancelSubmit = () => {
    setOpenDialog(false);
  };

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
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 3,
            textAlign: "left",
            color: "primary.main",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            letterSpacing: 0.5,
            borderBottom: "2px solid",
            borderColor: "primary.main",
            pb: 2,
          }}
        >
          Claims & Checklist - Action Items
        </Typography>
        <Grid container spacing={1}>
          {fields.map((field, idx) => (
            // @ts-ignore
            <Grid item xs={12} sm={6} xl={4} key={field.id}>
              <ClaimChecklistCard claimIndex={idx} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2, textAlign: "left" }}>
          <Button
            onClick={handleSubmitClick}
            variant="contained"
            size="small"
            sx={{
              fontWeight: 600,
              px: 1.5,
              py: 0.5,
            }}
          >
            Submit Claim
          </Button>
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
          <Typography variant="body1" color="text.secondary">
            Are you sure to submit the evidences?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCancelSubmit}
            variant="outlined"
            size="small"
            sx={{
              fontWeight: 500,
              px: 2,
              py: 0.5,
            }}
          >
            No
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            variant="contained"
            size="small"
            sx={{
              fontWeight: 600,
              px: 2,
              py: 0.5,
            }}
          >
            Yes, Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
