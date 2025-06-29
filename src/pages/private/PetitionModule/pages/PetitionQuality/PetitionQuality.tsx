import React, { useEffect } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";
import { useAppSelector } from "src/stores/hooks";
import ClaimSection from "./components/ClaimSection";
import { petitionQualityStyles } from "./PetitionQuality.style";
import { claimsData } from "./data/claimsData";
import AxiosClient from "src/services/AxiosClient/AxiosClient";
import { extractJsonFromGptResponse } from "utils/helpers/common.helpers";

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

  // Method to execute when both extractedText and evidenceFileContents are non-empty
  const executeCombinedAnalysis = async () => {
    const promptMessage =
      "You are a legal assistant working with the Andhra Pradesh Police. Your task is to evaluate the quality of evidence submitted for each expected item in a legal case.\n\nYou will receive:\n1. An `evidenceChecklist` – the expected list of evidence items for the claim\n2. A list of `submittedEvidence` – actual evidence descriptions or extracted content\n\nFor each expected evidence item:\n- Determine whether it is available in submittedEvidence (by fuzzy or semantic match)\n- If found, evaluate its quality as one of:\n - 'Good': Clear, complete, and directly relevant\n - 'Moderate': Partially relevant, incomplete, or slightly unclear\n - 'Bad': Unclear, irrelevant, or missing details\n\nReturn your response as a JSON object with the following keys:\n\n1. `evidenceChecklistAnalysis`: an array of objects, each including:\n  - `evidenceItem`\n  - `isAvailable`: true or false\n  - `quality`: 'Good', 'Moderate', or 'Bad'\n  - `remarks`: brief justification\n  - `source`: matching submitted evidence snippet or null\n\n2. `missingEvidence`: a list of evidence items from the checklist that were not found in the submitted evidence\n\nRespond strictly in JSON format with camelCase keys only. Do not include any explanations outside the JSON structure.";
    const requestJson = {
      promptMessage,
      inputText:
        "Complaint text:\n" + extractedText + "\n\n" + evidenceFileContents,
    };

    const response = await AxiosClient.getInstance().post("/ai", requestJson);
    const parsed = extractJsonFromGptResponse(response.data.message);
    console.log("vvv-somedata:", parsed);
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
