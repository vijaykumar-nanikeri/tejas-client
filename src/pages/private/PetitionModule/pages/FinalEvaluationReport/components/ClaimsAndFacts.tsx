import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Inbox as InboxIcon } from "@mui/icons-material";
import { ClaimAndFacts } from "../data/finalEvaluationData";
import { claimsAndFactsStyles } from "./ClaimsAndFacts.style";

interface ClaimsAndFactsProps {
  claimsAndFacts: ClaimAndFacts[];
}

const ClaimsAndFacts: React.FC<ClaimsAndFactsProps> = ({ claimsAndFacts }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Box sx={claimsAndFactsStyles.container}>
      <Typography variant="h6" sx={claimsAndFactsStyles.sectionTitle}>
        Listed Claims and Supporting Facts
      </Typography>

      <Box sx={claimsAndFactsStyles.tableContainer}>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={claimsAndFactsStyles.table}>
            <TableHead sx={claimsAndFactsStyles.tableHead}>
              <TableRow>
                <TableCell sx={{ width: "60px" }}>S.NO</TableCell>
                <TableCell sx={{ width: "100px" }}>DATE</TableCell>
                <TableCell>CLAIM DESCRIPTION</TableCell>
                <TableCell>SUPPORTING FACTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={claimsAndFactsStyles.tableBody}>
              {claimsAndFacts.length === 0 ? (
                <TableRow sx={claimsAndFactsStyles.noDataRow}>
                  <TableCell colSpan={4} sx={claimsAndFactsStyles.noDataCell}>
                    <InboxIcon sx={claimsAndFactsStyles.noDataIcon} />
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                claimsAndFacts.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell sx={claimsAndFactsStyles.serialNumberCell}>
                      {claim.id}
                    </TableCell>
                    <TableCell sx={claimsAndFactsStyles.dateCell}>
                      {formatDate(claim.date)}
                    </TableCell>
                    <TableCell sx={claimsAndFactsStyles.claimCell}>
                      {claim.claimDescription}
                    </TableCell>
                    <TableCell sx={claimsAndFactsStyles.factsCell}>
                      {claim.supportingFacts}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ClaimsAndFacts;
