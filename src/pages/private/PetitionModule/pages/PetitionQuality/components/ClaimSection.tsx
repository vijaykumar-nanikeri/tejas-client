import React from "react";
import { Box, Typography, Alert, Button, Stack, Divider } from "@mui/material";
import {
  Warning as WarningIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import EvidenceTable from "./EvidenceTable";
import { petitionQualityStyles } from "../PetitionQuality.style";
import { ClaimData } from "../data/claimsData";

interface ClaimSectionProps {
  claim: ClaimData;
  isLast: boolean;
}

const ClaimSection: React.FC<ClaimSectionProps> = ({ claim, isLast }) => {
  return (
    <Box>
      <Box sx={petitionQualityStyles.claimSection}>
        <Typography variant="h6" sx={petitionQualityStyles.claimTitle}>
          Claim No: {claim.claimNo} — {claim.claimName}
        </Typography>
        <EvidenceTable data={claim.evidences} />
      </Box>

      <Alert
        severity="warning"
        icon={<WarningIcon />}
        sx={petitionQualityStyles.alert}
        action={
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexShrink: 0,
              ml: 2,
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              variant="outlined"
              startIcon={<UploadIcon />}
              sx={petitionQualityStyles.actionButton}
            >
              Reupload Bad Evidences
            </Button>
            <Button
              size="small"
              variant="contained"
              startIcon={<UploadIcon />}
              sx={petitionQualityStyles.actionButton}
            >
              Upload Missing
            </Button>
          </Stack>
        }
      >
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
          {claim.hasMissingDocuments
            ? "Some documents are missing for this claim. Please ensure all required evidence files are uploaded and meet quality standards. Missing or poor quality documents may delay the processing of your petition."
            : "All required documents have been uploaded for this claim. However, please review the quality assessment below and consider re-uploading any documents marked as 'Bad' quality to ensure optimal processing of your petition."}
        </Typography>
      </Alert>

      {!isLast && <Divider sx={petitionQualityStyles.divider} />}
    </Box>
  );
};

export default ClaimSection;
