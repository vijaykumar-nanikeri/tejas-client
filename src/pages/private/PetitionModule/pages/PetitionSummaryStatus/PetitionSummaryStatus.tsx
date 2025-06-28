import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import ClaimSummary from "./components/ClaimSummary";
import ActionButtons from "./components/ActionButtons";
import { petitionSummaryStyles } from "./PetitionSummaryStatus.style";

interface ClaimSummaryData {
  claimNo: string;
  claimName: string;
  evidenceCoverage: number;
  evidenceRating: number;
  aiStatus: "partially support" | "fully supported" | "unsupported";
  aiStatusMessage: string;
}

interface PetitionSummaryStatusProps {
  onBack?: () => void;
  onGenerateReport?: () => void;
}

const PetitionSummaryStatus: React.FC<PetitionSummaryStatusProps> = ({
  onBack,
  onGenerateReport,
}) => {
  const claimsData: ClaimSummaryData[] = [
    {
      claimNo: "001",
      claimName: "Harassment",
      evidenceCoverage: 2,
      evidenceRating: 2,
      aiStatus: "partially support",
      aiStatusMessage:
        "Evidence partially supports the claim; additional witness statements recommended.",
    },
    {
      claimNo: "002",
      claimName: "Encroachment",
      evidenceCoverage: 3,
      evidenceRating: 3,
      aiStatus: "fully supported",
      aiStatusMessage:
        "All required evidence provided and verified; claim is fully supported.",
    },
    {
      claimNo: "003",
      claimName: "Fraud",
      evidenceCoverage: 1,
      evidenceRating: 1,
      aiStatus: "unsupported",
      aiStatusMessage:
        "Insufficient evidence to support fraud claim; requires additional investigation.",
    },
  ];

  const handleDownloadPDF = () => {
    console.log("Downloading as PDF...");
    // Add PDF download logic here
  };

  const handleSubmitToSP = () => {
    console.log("Submitting to SP...");
    // Add submit to SP logic here
  };

  return (
    <Box sx={petitionSummaryStyles.container}>
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
            Back to Quality Review
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
          Petition Summary & Status
        </Typography>
      </Box>

      <Box sx={petitionSummaryStyles.claimsContainer}>
        {claimsData.map((claim) => (
          <ClaimSummary key={claim.claimNo} claim={claim} />
        ))}
      </Box>

      <Card sx={petitionSummaryStyles.card}>
        <CardContent sx={petitionSummaryStyles.cardContent}>
          <Box sx={petitionSummaryStyles.footer}>
            <Typography variant="h6" sx={petitionSummaryStyles.footerTitle}>
              Officer Summary Notes
            </Typography>
            <Box sx={petitionSummaryStyles.blockquote}>
              <Typography
                variant="body1"
                sx={petitionSummaryStyles.blockquoteText}
              >
                "Reviewed and partially verified; needs SP approval for site
                inspection follow-up. Harassment claim requires additional
                witness statements. Encroachment evidence is comprehensive and
                ready for processing. Fraud allegations need further
                investigation due to insufficient documentary evidence."
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <ActionButtons
        onDownloadPDF={handleDownloadPDF}
        onSubmitToSP={handleSubmitToSP}
        onGenerateReport={onGenerateReport}
      />
    </Box>
  );
};

export default PetitionSummaryStatus;
