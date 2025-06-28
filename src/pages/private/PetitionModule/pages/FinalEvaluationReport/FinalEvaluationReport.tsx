import React from "react";
import { Box } from "@mui/material";
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
import ClaimsAndFacts from "./components/ClaimsAndFacts";
import ClaimEvidence from "./components/ClaimEvidence";
import { finalEvaluationData } from "./data/finalEvaluationData";

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
  // Use provided props or fall back to data from JSON
  const data = {
    petitionId: petitionId || finalEvaluationData.petitionDetails.petitionId,
    priorityLevel:
      priorityLevel || finalEvaluationData.petitionDetails.priorityLevel,
    petitionerDetails: finalEvaluationData.petitionerDetails,
    incidentDetails: finalEvaluationData.incidentDetails,
    victimDetails: finalEvaluationData.victimDetails,
    accusedDetails: finalEvaluationData.accusedDetails,
    briefFactsSummary: finalEvaluationData.briefFactsSummary,
    enquiryReportSummary: finalEvaluationData.enquiryReportSummary,
    remarks: finalEvaluationData.remarks,
    actionDetailsByIO: finalEvaluationData.actionDetailsByIO,
    systemRecommendations: finalEvaluationData.systemRecommendations,
    claimsAndFacts: finalEvaluationData.claimsAndFacts,
    claimEvidence: finalEvaluationData.claimEvidence,
  };

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
        <EnquiryReportSummary content={data.enquiryReportSummary.summary} />
      </Box>

      {/* Remarks Section */}
      <Box sx={{ mb: 3 }}>
        <Remarks content={data.remarks.content} />
      </Box>

      {/* Action Details by IO Section */}
      <Box sx={{ mb: 3 }}>
        <ActionDetailsByIO content={data.actionDetailsByIO.content} />
      </Box>

      {/* System Recommendations Section */}
      <Box sx={{ mb: 3 }}>
        <SystemRecommendations content={data.systemRecommendations.content} />
      </Box>
    </Box>
  );
};

export default FinalEvaluationReport;
