import React, { useState } from "react";
import { Box } from "@mui/material";
import FileSelection from "./FileSelection/FileSelection";
import EvidenceChecklist from "./EvidenceChecklist/EvidenceChecklist";
import PetitionQuality from "../PetitionQuality/PetitionQuality";

const Petition: React.FC = () => {
  const [showQualityReview, setShowQualityReview] = useState(false);

  const handleShowQualityReview = () => {
    setShowQualityReview(true);
  };

  const handleBackToPetition = () => {
    setShowQualityReview(false);
  };

  if (showQualityReview) {
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
        <PetitionQuality onBack={handleBackToPetition} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        p: 2, // 16px margin
        display: "flex",
        flexDirection: "column",
        gap: 2, // 16px gap between cards
      }}
    >
      <FileSelection />
      <EvidenceChecklist onShowQualityReview={handleShowQualityReview} />
    </Box>
  );
};

export default Petition;
