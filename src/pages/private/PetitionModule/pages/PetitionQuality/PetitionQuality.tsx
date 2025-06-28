import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import ClaimSection from "./components/ClaimSection";
import { petitionQualityStyles } from "./PetitionQuality.style";
import { claimsData } from "./data/claimsData";

interface PetitionQualityProps {
  onBack?: () => void;
  onProceedToSummary?: () => void;
}

const PetitionQuality: React.FC<PetitionQualityProps> = ({
  onBack,
  onProceedToSummary,
}) => {
  return (
    <Box sx={petitionQualityStyles.container}>
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
            Back to Petition
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
          Evidences Quality Review
        </Typography>
      </Box>

      <Card sx={petitionQualityStyles.card}>
        <CardContent sx={petitionQualityStyles.cardContent}>
          {claimsData.map((claim, index) => (
            <ClaimSection
              key={claim.claimNo}
              claim={claim}
              isLast={index === claimsData.length - 1}
            />
          ))}

          {onProceedToSummary && (
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={<AssessmentIcon />}
                onClick={onProceedToSummary}
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                Proceed to Summary
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PetitionQuality;
