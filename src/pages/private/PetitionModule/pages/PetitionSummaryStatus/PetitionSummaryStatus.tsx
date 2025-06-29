import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import ClaimSummary from "./components/ClaimSummary";
import ActionButtons from "./components/ActionButtons";
import { petitionSummaryStyles } from "./PetitionSummaryStatus.style";
import { useAppSelector } from "src/stores/hooks";
import AxiosClient from "src/services/AxiosClient/AxiosClient";
import { extractJsonFromGptResponse } from "utils/helpers/common.helpers";

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
  const { extractedText, evidenceFileContents } = useAppSelector(
    (state) => state.claims
  );

  const [claimsData, setClaimsData] = useState<ClaimSummaryData[]>([]);

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

    // Map the API response to the ClaimSummaryData structure
    const mappedClaimsData: ClaimSummaryData[] = [];

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

      // Convert to ClaimSummaryData structure
      Object.keys(groupedByClaimType).forEach((claimType, index) => {
        const evidenceItems = groupedByClaimType[claimType];

        // Calculate evidence coverage (number of available evidence items)
        const availableEvidence = evidenceItems.filter(
          (item: any) => item.isAvailable
        );
        const evidenceCoverage = availableEvidence.length;

        // Calculate evidence rating based on quality
        const qualityScores = evidenceItems.map((item: any) => {
          switch (item.quality.toLowerCase()) {
            case "good":
              return 3;
            case "moderate":
              return 2;
            case "bad":
              return 1;
            default:
              return 0;
          }
        });
        const averageRating =
          qualityScores.length > 0
            ? Math.round(
                qualityScores.reduce(
                  (sum: number, score: number) => sum + score,
                  0
                ) / qualityScores.length
              )
            : 0;

        // Determine AI status based on evidence coverage and quality
        let aiStatus: "partially support" | "fully supported" | "unsupported";
        let aiStatusMessage: string;

        if (evidenceCoverage === 0) {
          aiStatus = "unsupported";
          aiStatusMessage = "No evidence available to support this claim.";
        } else if (
          evidenceCoverage >= evidenceItems.length * 0.8 &&
          averageRating >= 2
        ) {
          aiStatus = "fully supported";
          aiStatusMessage =
            "Strong evidence available with good quality ratings.";
        } else {
          aiStatus = "partially support";
          aiStatusMessage =
            "Some evidence available but may need additional verification.";
        }

        mappedClaimsData.push({
          claimNo: (index + 1).toString().padStart(3, "0"), // Generate claim numbers like "001", "002"
          claimName: claimType,
          evidenceCoverage,
          evidenceRating: averageRating,
          aiStatus,
          aiStatusMessage,
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

  // const claimsData: ClaimSummaryData[] = [
  //   {
  //     claimNo: "001",
  //     claimName: "Harassment",
  //     evidenceCoverage: 2,
  //     evidenceRating: 2,
  //     aiStatus: "partially support",
  //     aiStatusMessage:
  //       "Evidence partially supports the claim; additional witness statements recommended.",
  //   },
  //   {
  //     claimNo: "002",
  //     claimName: "Encroachment",
  //     evidenceCoverage: 3,
  //     evidenceRating: 3,
  //     aiStatus: "fully supported",
  //     aiStatusMessage:
  //       "All required evidence provided and verified; claim is fully supported.",
  //   },
  //   {
  //     claimNo: "003",
  //     claimName: "Fraud",
  //     evidenceCoverage: 1,
  //     evidenceRating: 1,
  //     aiStatus: "unsupported",
  //     aiStatusMessage:
  //       "Insufficient evidence to support fraud claim; requires additional investigation.",
  //   },
  // ];

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
