import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import PetitionerDetails from "./components/PetitionerDetails";
import IncidentDetails from "./components/IncidentDetails";
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
    </Box>
  );
};

export default FinalEvaluationReport;
