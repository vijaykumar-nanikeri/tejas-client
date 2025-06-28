import React, { useState } from "react";
import { Box } from "@mui/material";
import FileSelection from "./FileSelection/FileSelection";
import EvidenceChecklist from "./EvidenceChecklist/EvidenceChecklist";
import PetitionQuality from "../PetitionQuality/PetitionQuality";
import PetitionSummaryStatus from "../PetitionSummaryStatus/PetitionSummaryStatus";

type PetitionView = "form" | "quality" | "summary";

const Petition: React.FC = () => {
  const [currentView, setCurrentView] = useState<PetitionView>("form");

  const handleShowQualityReview = () => {
    setCurrentView("quality");
  };

  const handleBackToPetition = () => {
    setCurrentView("form");
  };

  const handleProceedToSummary = () => {
    setCurrentView("summary");
  };

  const handleBackToQuality = () => {
    setCurrentView("quality");
  };

  const renderContent = () => {
    switch (currentView) {
      case "quality":
        return (
          <PetitionQuality
            onBack={handleBackToPetition}
            onProceedToSummary={handleProceedToSummary}
          />
        );
      case "summary":
        return <PetitionSummaryStatus onBack={handleBackToQuality} />;
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
