import React from "react";
import { Box } from "@mui/material";
import ClaimGroupCard from "./ClaimGroupCard";

interface ClaimChecklistBoardProps {
  onShowQualityReview: () => void;
}

export default function ClaimChecklistBoard({
  onShowQualityReview,
}: ClaimChecklistBoardProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <ClaimGroupCard onShowQualityReview={onShowQualityReview} />
    </Box>
  );
}
