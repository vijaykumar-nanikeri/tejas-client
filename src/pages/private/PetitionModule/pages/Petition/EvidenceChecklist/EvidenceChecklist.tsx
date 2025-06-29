import React from "react";
import { Box } from "@mui/material";
import ClaimChecklistBoard from "./ClaimChecklistBoard";
import { useAppSelector } from "src/stores/hooks";

interface EvidenceChecklistProps {
  onShowQualityReview: () => void;
}

const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({
  onShowQualityReview,
}) => {
  const { claims, isLoading, error } = useAppSelector((state) => state.claims);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        Loading claims...
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          color: "error.main",
        }}
      >
        {error}
      </Box>
    );
  }

  if (!claims || claims.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        No claims found. Please upload a file first.
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <ClaimChecklistBoard onShowQualityReview={onShowQualityReview} />
    </Box>
  );
};

export default EvidenceChecklist;
