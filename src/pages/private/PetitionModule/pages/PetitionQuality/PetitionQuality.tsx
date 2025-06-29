import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { useAppSelector } from "src/stores/hooks";
import ClaimSection from "./components/ClaimSection";
import { petitionQualityStyles } from "./PetitionQuality.style";
// import { claimsData } from "./data/claimsData";
import AxiosClient from "src/services/AxiosClient/AxiosClient";
import { extractJsonFromGptResponse } from "utils/helpers/common.helpers";
import { ClaimData, EvidenceData } from "./data/claimsData";

interface PetitionQualityProps {
  onBack?: () => void;
  onProceedToSummary?: () => void;
}

const PetitionQuality: React.FC<PetitionQualityProps> = ({
  onBack,
  onProceedToSummary,
}) => {
  const { extractedText, evidenceFileContents } = useAppSelector(
    (state) => state.claims
  );

  const [claimsData, setClaimsData] = useState<ClaimData[]>([]);

  // Method to execute when both extractedText and evidenceFileContents are non-empty
  const executeCombinedAnalysis = async () => {
    const promptMessage =
      "You are a legal assistant working with the Andhra Pradesh Police. Your task is to evaluate the quality of evidence submitted for each expected item in a legal case, separately for each legal claim.\n\nYou will receive:\n1. A list of claims. For each claim:\n  - `claimType`: the legal classification (e.g., Robbery, Harassment, Dowry, etc.)\n  - `evidenceChecklist`: the expected list of evidence items relevant to that claim\n2. A list of `submittedEvidence`: actual evidence descriptions or extracted content\n\nFor each claimType and its checklist:\n- Go through each evidence item\n- Check whether it's available in `submittedEvidence` (by fuzzy or semantic match)\n- If found, evaluate its quality as one of:\n - 'Good': Clear, complete, and directly relevant to the claimType\n - 'Moderate': Partially relevant, incomplete, or somewhat unclear\n - 'Bad': Unclear, irrelevant, or missing details\n\nReturn your response in **strict JSON format** with camelCase keys. The structure must be:\n\n1. `evidenceChecklistAnalysis`: an array of objects where each object includes:\n  - `claimType`\n  - `evidenceItem`\n  - `isAvailable`: true or false\n  - `quality`: 'Good', 'Moderate', or 'Bad'\n  - `remarks`: short explanation\n  - `source`: matching snippet from submittedEvidence or null\n\n2. `missingEvidence`: an array of objects, each including:\n  - `claimType`\n  - `evidenceItem`: expected but not found in submitted evidence\n\nDo not include any explanation or commentary outside the JSON structure. Output must only contain the JSON object with camelCase keys.";
    const requestJson = {
      promptMessage,
      inputText:
        "Complaint text:\n" + extractedText + "\n\n" + evidenceFileContents,
    };

    const response = await AxiosClient.getInstance().post("/ai", requestJson);
    const parsed: any = extractJsonFromGptResponse(response.data.message);
    console.log("vvv-parsed: ", parsed);
    const evidenceChecklistAnalysis = parsed?.evidenceChecklistAnalysis;

    // Map the API response to the ClaimData structure
    const mappedClaimsData: ClaimData[] = [];

    if (evidenceChecklistAnalysis && Array.isArray(evidenceChecklistAnalysis)) {
      // Group by claimType
      const groupedByClaimType = evidenceChecklistAnalysis.reduce(
        (acc: any, item: any) => {
          if (!acc[item.claimType]) {
            acc[item.claimType] = [];
          }
          acc[item.claimType].push(item);
          return acc;
        },
        {}
      );

      // Convert to ClaimData structure
      Object.keys(groupedByClaimType).forEach((claimType, index) => {
        const evidenceItems = groupedByClaimType[claimType];

        const evidences: EvidenceData[] = evidenceItems.map((item: any) => ({
          document: item.evidenceItem,
          quality: item.quality.toLowerCase() as "good" | "bad",
          aiFeedback: item.remarks,
        }));

        const hasMissingDocuments = evidenceItems.some(
          (item: any) => !item.isAvailable
        );

        mappedClaimsData.push({
          claimNo: (index + 1).toString().padStart(3, "0"), // Generate claim numbers like "001", "002"
          claimName: claimType,
          evidences,
          hasMissingDocuments,
        });
      });
    }

    setClaimsData(mappedClaimsData);
  };

  // useEffect to check when both variables are non-empty
  useEffect(() => {
    if (extractedText && evidenceFileContents) {
      console.log("Both extractedText and evidenceFileContents are available!");
      executeCombinedAnalysis();
    }
  }, [extractedText, evidenceFileContents]);

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
          {/* Display status of Redux variables */}
          <Box sx={{ mb: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Analysis Status:</strong>
            </Typography>
            <Typography
              variant="body2"
              color={extractedText ? "success.main" : "error.main"}
            >
              • Original AI Response:{" "}
              {extractedText ? "Available" : "Not Available"}
            </Typography>
            <Typography
              variant="body2"
              color={evidenceFileContents ? "success.main" : "error.main"}
            >
              • Evidence File Contents:{" "}
              {evidenceFileContents ? "Available" : "Not Available"}
            </Typography>
            {extractedText && evidenceFileContents && (
              <Typography
                variant="body2"
                color="success.main"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                ✓ Combined analysis ready!
              </Typography>
            )}
          </Box>

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
