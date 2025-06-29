import React, { useState } from "react";
import { Box } from "@mui/material";
import FileSelection from "./FileSelection/FileSelection";
import EvidenceChecklist from "./EvidenceChecklist/EvidenceChecklist";
import PetitionQuality from "../PetitionQuality/PetitionQuality";
import PetitionSummaryStatus from "../PetitionSummaryStatus/PetitionSummaryStatus";
import FinalEvaluationReport from "../FinalEvaluationReport";

type PetitionView = "form" | "quality" | "summary" | "finalReport";

const Petition: React.FC = () => {
  const [currentView, setCurrentView] = useState<PetitionView>("form");
  const [claims, setClaims] = useState<any[]>([]);

  const handleShowQualityReview = () => {
    setCurrentView("quality");
  };

  const handleBackToPetition = () => {
    setCurrentView("form");
  };

  const handleBackToQuality = () => {
    setCurrentView("quality");
  };

  const handleShowFinalReport = () => {
    setCurrentView("finalReport");
  };

  const handleBackToSummary = () => {
    setCurrentView("summary");
  };

  const renderContent = () => {
    switch (currentView) {
      case "quality":
        return (
          <PetitionQuality
            onBack={handleBackToPetition}
            onProceedToSummary={handleShowFinalReport}
          />
        );
      case "summary":
        return (
          <PetitionSummaryStatus
            onBack={handleBackToQuality}
            onGenerateReport={handleShowFinalReport}
          />
        );
      case "finalReport":
        return <FinalEvaluationReport onBack={handleBackToSummary} />;
      default:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FileSelection setClaims={setClaims} />
            <EvidenceChecklist
              onShowQualityReview={handleShowQualityReview}
              claims={claims}
            />
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default Petition;
