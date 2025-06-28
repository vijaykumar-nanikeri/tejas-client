import React from "react";
import { Box } from "@mui/material";
import FileSelection from "./FileSelection/FileSelection";
import EvidenceChecklist from "./EvidenceChecklist/EvidenceChecklist";

const Petition: React.FC = () => {
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
      <EvidenceChecklist />
    </Box>
  );
};

export default Petition;
