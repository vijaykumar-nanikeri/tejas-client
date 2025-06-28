import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Cancel as CancelIcon,
  Assessment as AssessmentIcon,
  Psychology as PsychologyIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { petitionSummaryStyles } from "../PetitionSummaryStatus.style";

interface ClaimSummaryData {
  claimNo: string;
  claimName: string;
  evidenceCoverage: number;
  evidenceRating: number;
  aiStatus: "partially support" | "fully supported" | "unsupported";
  aiStatusMessage: string;
}

interface ClaimSummaryProps {
  claim: ClaimSummaryData;
}

const ClaimSummary: React.FC<ClaimSummaryProps> = ({ claim }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "fully supported":
        return <CheckCircleIcon color="success" />;
      case "partially support":
        return <WarningIcon color="warning" />;
      case "unsupported":
        return <CancelIcon color="error" />;
      default:
        return <AssessmentIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "fully supported":
        return "success";
      case "partially support":
        return "warning";
      case "unsupported":
        return "error";
      default:
        return "default";
    }
  };

  const renderEvidenceRating = (coverage: number, rating: number) => {
    const stars = [];
    for (let i = 0; i < 3; i++) {
      if (i < rating) {
        stars.push("★");
      } else {
        stars.push("☆");
      }
    }
    return `${coverage}/3 evidence items • ${stars.join(
      ""
    )} (${rating}/3 rating)`;
  };

  return (
    <Card sx={petitionSummaryStyles.claimCard}>
      <CardContent sx={petitionSummaryStyles.claimCardContent}>
        <Typography variant="h6" sx={petitionSummaryStyles.claimTitle}>
          Claim No: {claim.claimNo} — {claim.claimName}
        </Typography>

        <Box sx={petitionSummaryStyles.claimDetailsContainer}>
          {/* Evidence Coverage */}
          <Box sx={petitionSummaryStyles.detailItem}>
            <Box sx={petitionSummaryStyles.detailHeader}>
              <AssessmentIcon
                color="primary"
                sx={petitionSummaryStyles.detailIcon}
              />
              <Typography
                variant="subtitle2"
                sx={petitionSummaryStyles.detailTitle}
              >
                Evidence Coverage & Rating
              </Typography>
            </Box>
            <Typography variant="body2" sx={petitionSummaryStyles.detailValue}>
              {renderEvidenceRating(
                claim.evidenceCoverage,
                claim.evidenceRating
              )}
            </Typography>
          </Box>

          {/* Verification Status */}
          <Box sx={petitionSummaryStyles.detailItem}>
            <Box sx={petitionSummaryStyles.detailHeader}>
              <VerifiedIcon
                color="primary"
                sx={petitionSummaryStyles.detailIcon}
              />
              <Typography
                variant="subtitle2"
                sx={petitionSummaryStyles.detailTitle}
              >
                Verification Status
              </Typography>
            </Box>
            <Chip
              label={
                claim.aiStatus === "fully supported"
                  ? "Verified"
                  : "Pending Review"
              }
              color={
                claim.aiStatus === "fully supported" ? "success" : "warning"
              }
              size="small"
              sx={petitionSummaryStyles.statusChip}
            />
          </Box>

          {/* Vertical Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={petitionSummaryStyles.verticalDivider}
          />

          {/* AI Analysis Status */}
          <Box sx={petitionSummaryStyles.detailItem}>
            <Box sx={petitionSummaryStyles.detailHeader}>
              <PsychologyIcon
                color="primary"
                sx={petitionSummaryStyles.detailIcon}
              />
              <Typography
                variant="subtitle2"
                sx={petitionSummaryStyles.detailTitle}
              >
                AI Analysis Status
              </Typography>
            </Box>
            <Box sx={petitionSummaryStyles.aiStatusContainer}>
              <Chip
                icon={getStatusIcon(claim.aiStatus)}
                label={claim.aiStatus.replace("_", " ").toUpperCase()}
                color={getStatusColor(claim.aiStatus) as any}
                size="small"
                sx={petitionSummaryStyles.statusChip}
              />
              <Typography
                variant="body2"
                sx={petitionSummaryStyles.statusMessage}
              >
                {claim.aiStatusMessage}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClaimSummary;
