import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import PetitionerDetails from "./components/PetitionerDetails";
import IncidentDetails from "./components/IncidentDetails";
import VictimDetails from "./components/VictimDetails";
import AccusedDetails from "./components/AccusedDetails";
import BriefFactsSummary from "./components/BriefFactsSummary";
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
    </Box>
  );
};

export default FinalEvaluationReport;
