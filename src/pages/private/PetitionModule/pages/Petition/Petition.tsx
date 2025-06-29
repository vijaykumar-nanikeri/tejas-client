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

  const handleShowQualityReview = () => {
    setCurrentView("quality");
  };

  const handleBackToPetition = () => {
    setCurrentView("form");
  };

  const handleBackToQuality = () => {
    setCurrentView("quality");
  };

  const handleShowSummary = () => {
    setCurrentView("summary");
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
            onProceedToSummary={handleShowSummary}
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
            <FileSelection />
            <EvidenceChecklist onShowQualityReview={handleShowQualityReview} />
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
