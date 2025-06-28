import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { ClaimSection } from "./components";
import { petitionQualityStyles } from "./PetitionQuality.style";
import { claimsData } from "./data/claimsData";

interface PetitionQualityProps {
  onBack?: () => void;
}

const PetitionQuality: React.FC<PetitionQualityProps> = ({ onBack }) => {
  return (
    <Box sx={petitionQualityStyles.container}>
      {onBack && (
        <Box sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            variant="outlined"
            size="small"
            sx={{ textTransform: "capitalize" }}
          >
            Back to Petition
          </Button>
        </Box>
      )}

      <Card sx={petitionQualityStyles.card}>
        <CardContent sx={petitionQualityStyles.cardContent}>
          <Typography variant="h5" sx={petitionQualityStyles.title}>
            Evidences Quality Review
          </Typography>

          {claimsData.map((claim, index) => (
            <ClaimSection
              key={claim.claimNo}
              claim={claim}
              isLast={index === claimsData.length - 1}
            />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PetitionQuality;
