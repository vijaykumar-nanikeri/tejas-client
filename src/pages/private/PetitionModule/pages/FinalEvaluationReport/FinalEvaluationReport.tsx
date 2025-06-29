import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "src/stores/hooks";
import Header from "./Header";
import PetitionerDetails from "./components/PetitionerDetails";
import IncidentDetails from "./components/IncidentDetails";
import VictimDetails from "./components/VictimDetails";
import AccusedDetails from "./components/AccusedDetails";
import BriefFactsSummary from "./components/BriefFactsSummary";
import EnquiryReportSummary from "./components/EnquiryReportSummary";
import Remarks from "./components/Remarks";
import ActionDetailsByIO from "./components/ActionDetailsByIO";
import SystemRecommendations from "./components/SystemRecommendations";
import EvidenceStrengthAnalysis from "./components/EvidenceStrengthAnalysis";
import ClaimsAndFacts from "./components/ClaimsAndFacts";
import ClaimEvidence from "./components/ClaimEvidence";
// import { finalEvaluationData } from "./data/finalEvaluationData";
import AxiosClient from "src/services/AxiosClient/AxiosClient";
import { extractJsonFromGptResponse } from "utils/helpers/common.helpers";

interface FinalEvaluationReportProps {
  onBack?: () => void;
  petitionId?: string;
  priorityLevel?: "High" | "Medium" | "Low";
}

const FinalEvaluationReport: React.FC<FinalEvaluationReportProps> = ({
  onBack,
  petitionId,
  priorityLevel,
}) => {
  const { extractedText, evidenceFileContents } = useAppSelector(
    (state) => state.claims
  );

  const [apiResponse, setApiResponse] = useState<any>(null);
  const [reportData, setReportData] = useState<any>(null);

  // Helper function to safely convert values to strings
  const safeString = (value: any): string => {
    if (typeof value === "string") return value;
    if (typeof value === "object" && value !== null) {
      if (value.content) return String(value.content);
      if (value.summary) return String(value.summary);
      return JSON.stringify(value);
    }
    return String(value || "-");
  };

  // Method to execute when both extractedText and evidenceFileContents are non-empty
  const executeCombinedAnalysis = async () => {
    const promptMessage =
      "You are a legal case assistant for the Andhra Pradesh Police. Your task is to generate a complete case evaluation report using previously extracted data, and also generate a unique petition ID in the format `YYYYMMDDNNN`.\n\n### Petition ID Format:\n- YYYY = year\n- MM = month\n- DD = date\n- NNN = a 3-digit running number for the day starting from 000\n- Generate the petitionId based on the current date and assume this is the first petition of the day unless a sequence number is explicitly provided.\n\n### Evaluation Report Fields:\nBased on all available information extracted in previous steps (such as complaint text, WWW-H facts, claim classification, evidence checklist, submitted documents, quality scores, AI summaries, etc.), populate the following fields:\n\n- petitionId\n- priorityLevel\n- petitionerDetails (name, fatherName, address, phoneNo)\n- dateAndPlaceOfIncident (date, time, place)\n- victimDetails (same structure as petitionerDetails)\n- accusedDetails: list of accused with name, fatherName, address, phoneNo\n- briefFactsSummary\n- listedClaimsAndSupportingFacts: array with date, claimDescription, supportingFacts\n- claimWiseEvidence: array with claimDescription, evidenceSubmitted, documentProofDescription, factCheckedAiSummary\n- enquiryReportSummaryByAi\n- evidenceStrengthAnalysis: clarityOfEvidence, relevanceToClaims, officerDocumentationQuality, consistencyOfInformation, overallEvidenceAiEvaluationScore, officerScore\n- petitionStatus\n- remarks\n- finalObservations: petitionFacts (True, False, Partially True), actionRecommended\n\n### Instructions:\n- Return your output strictly in JSON format using camelCase keys\n- If any value is unknown or unavailable, return null or an empty string\n- Do not include explanations or headings outside the JSON";

    const requestJson = {
      promptMessage,
      inputText:
        "Case Details:\n" +
        extractedText +
        "\n\nEvidence Files:\n" +
        evidenceFileContents,
    };

    const response = await AxiosClient.getInstance().post("/ai", requestJson);
    const parsed: any = extractJsonFromGptResponse(response.data.message);
    console.log("Final Evaluation Report API Response:", parsed);
    setApiResponse(parsed);
  };

  // Map API response to report data
  useEffect(() => {
    if (apiResponse) {
      const mappedData = {
        petitionId: apiResponse.petitionId || petitionId || "-",
        priorityLevel: apiResponse.priorityLevel || priorityLevel || "-",
        petitionerDetails: {
          name: apiResponse.petitionerDetails?.name || "-",
          fatherName: apiResponse.petitionerDetails?.fatherName || "-",
          address: apiResponse.petitionerDetails?.address || "-",
          phoneNo: apiResponse.petitionerDetails?.phoneNo || "-",
        },
        incidentDetails: {
          date: apiResponse.dateAndPlaceOfIncident?.date || "-",
          time: apiResponse.dateAndPlaceOfIncident?.time || "-",
          place: apiResponse.dateAndPlaceOfIncident?.place || "-",
        },
        victimDetails: {
          name: apiResponse.victimDetails?.name || "-",
          fatherName: apiResponse.victimDetails?.fatherName || "-",
          address: apiResponse.victimDetails?.address || "-",
          phoneNo: apiResponse.victimDetails?.phoneNo || "-",
        },
        accusedDetails: {
          name: apiResponse.accusedDetails?.[0]?.name || "-",
          fatherName: apiResponse.accusedDetails?.[0]?.fatherName || "-",
          address: apiResponse.accusedDetails?.[0]?.address || "-",
          phoneNo: apiResponse.accusedDetails?.[0]?.phoneNo || "-",
        },
        briefFactsSummary: {
          summary: apiResponse.briefFactsSummary || "-",
        },
        enquiryReportSummary: safeString(apiResponse.enquiryReportSummaryByAi),
        remarks: safeString(apiResponse.remarks),
        actionDetailsByIO: safeString(
          apiResponse.finalObservations?.actionRecommended
        ),
        systemRecommendations: safeString(
          apiResponse.finalObservations?.actionRecommended
        ),
        evidenceStrengthAnalysis: apiResponse.evidenceStrengthAnalysis
          ? Object.entries(apiResponse.evidenceStrengthAnalysis)
              .filter(
                ([key, value]) =>
                  key !== "overallEvidenceAiEvaluationScore" &&
                  key !== "officerScore" &&
                  value !== null
              )
              .map(([key, value], index) => {
                let score = 0;
                let metric = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());

                // Convert text values to scores
                if (typeof value === "string") {
                  if (
                    value === "High" ||
                    value === "Good" ||
                    value === "Consistent"
                  ) {
                    score = 9;
                  } else if (value === "Moderate") {
                    score = 6;
                  } else if (value === "Low" || value === "Poor") {
                    score = 3;
                  }
                }

                return {
                  id: index + 1,
                  metric,
                  score,
                };
              })
          : [],
        claimsAndFacts:
          apiResponse.listedClaimsAndSupportingFacts?.map(
            (claim: any, index: number) => ({
              id: index + 1,
              date: claim.date || "-",
              claimDescription: claim.claimDescription || "-",
              supportingFacts: claim.supportingFacts || "-",
            })
          ) || [],
        claimEvidence:
          apiResponse.claimWiseEvidence?.map((claim: any, index: number) => ({
            id: index + 1,
            claimDescription: claim.claimDescription || "-",
            evidenceSubmitted:
              claim.evidenceSubmitted && claim.evidenceSubmitted.length > 0,
            documentProofDescription: claim.documentProofDescription || "-",
            factCheckedAISummary: claim.factCheckedAiSummary || "-",
          })) || [],
      };

      setReportData(mappedData);
      console.log("Mapped report data:", mappedData);
    }
  }, [apiResponse, petitionId, priorityLevel]);

  // useEffect to check when both variables are non-empty
  useEffect(() => {
    if (extractedText && evidenceFileContents) {
      console.log(
        "Both extractedText and evidenceFileContents are available in FinalEvaluationReport!"
      );
      executeCombinedAnalysis();
    }
  }, [extractedText, evidenceFileContents]);

  // Use report data or show loading state
  const data = reportData || {
    petitionId: "-",
    priorityLevel: "-",
    petitionerDetails: {
      name: "-",
      fatherName: "-",
      address: "-",
      phoneNo: "-",
    },
    incidentDetails: { date: "-", time: "-", place: "-" },
    victimDetails: { name: "-", fatherName: "-", address: "-", phoneNo: "-" },
    accusedDetails: { name: "-", fatherName: "-", address: "-", phoneNo: "-" },
    briefFactsSummary: { summary: "-" },
    enquiryReportSummary: "-",
    remarks: "-",
    actionDetailsByIO: "-",
    systemRecommendations: "-",
    evidenceStrengthAnalysis: [],
    claimsAndFacts: [],
    claimEvidence: [],
  };

  console.log("Final data being passed to components:", {
    enquiryReportSummary: data.enquiryReportSummary,
    remarks: data.remarks,
    actionDetailsByIO: data.actionDetailsByIO,
    systemRecommendations: data.systemRecommendations,
  });

  // Calculate scores
  const overallAIScore =
    data.evidenceStrengthAnalysis.length > 0
      ? Math.round(
          data.evidenceStrengthAnalysis.reduce(
            (sum: number, item: any) => sum + item.score,
            0
          ) / data.evidenceStrengthAnalysis.length
        )
      : 0;
  const officerScore = 3; // Sample officer score

  return (
    <Box
      sx={{ p: 3, backgroundColor: "background.default", minHeight: "100vh" }}
    >
      <Header
        onBack={onBack}
        petitionId={data.petitionId}
        priorityLevel={data.priorityLevel}
      />

      {/* Petitioner Details Section */}
      <Box sx={{ mb: 3 }}>
        <PetitionerDetails petitionerDetails={data.petitionerDetails} />
      </Box>

      {/* Incident Details Section */}
      <Box sx={{ mb: 3 }}>
        <IncidentDetails incidentDetails={data.incidentDetails} />
      </Box>

      {/* Victim Details Section */}
      <Box sx={{ mb: 3 }}>
        <VictimDetails victimDetails={data.victimDetails} />
      </Box>

      {/* Accused Details Section */}
      <Box sx={{ mb: 3 }}>
        <AccusedDetails accusedDetails={data.accusedDetails} />
      </Box>

      {/* Brief Facts Summary Section */}
      <Box sx={{ mb: 3 }}>
        <BriefFactsSummary briefFactsSummary={data.briefFactsSummary} />
      </Box>

      {/* Claims and Facts Section */}
      <Box sx={{ mb: 3 }}>
        <ClaimsAndFacts claimsAndFacts={data.claimsAndFacts} />
      </Box>

      {/* Claim Evidence Section */}
      <Box sx={{ mb: 3 }}>
        <ClaimEvidence claimEvidence={data.claimEvidence} />
      </Box>

      {/* Enquiry Report Summary Section */}
      <Box sx={{ mb: 3 }}>
        <EnquiryReportSummary content={safeString(data.enquiryReportSummary)} />
      </Box>

      {/* Evidence Strength Analysis Section */}
      <Box sx={{ mb: 3 }}>
        <EvidenceStrengthAnalysis
          evidenceStrengthAnalysis={data.evidenceStrengthAnalysis}
          overallAIScore={overallAIScore}
          officerScore={officerScore}
        />
      </Box>

      {/* Remarks Section */}
      <Box sx={{ mb: 3 }}>
        <Remarks content={safeString(data.remarks)} />
      </Box>

      {/* Action Details by IO Section */}
      <Box sx={{ mb: 3 }}>
        <ActionDetailsByIO content={safeString(data.actionDetailsByIO)} />
      </Box>

      {/* System Recommendations Section */}
      <Box sx={{ mb: 3 }}>
        <SystemRecommendations
          content={safeString(data.systemRecommendations)}
        />
      </Box>
    </Box>
  );
};

export default FinalEvaluationReport;
