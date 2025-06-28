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
  Chip,
} from "@mui/material";
import { Inbox as InboxIcon } from "@mui/icons-material";
import { ClaimEvidence as ClaimEvidenceType } from "../data/finalEvaluationData";
import { claimEvidenceStyles } from "./ClaimEvidence.style";

interface ClaimEvidenceProps {
  claimEvidence: ClaimEvidenceType[];
}

const ClaimEvidence: React.FC<ClaimEvidenceProps> = ({ claimEvidence }) => {
  return (
    <Box sx={claimEvidenceStyles.container}>
      <Typography variant="h6" sx={claimEvidenceStyles.sectionTitle}>
        Claim-wise Evidence Submitted by IO/EO/SHO
      </Typography>

      <Box sx={claimEvidenceStyles.tableContainer}>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={claimEvidenceStyles.table}>
            <TableHead sx={claimEvidenceStyles.tableHead}>
              <TableRow>
                <TableCell sx={{ width: "60px" }}>S.NO</TableCell>
                <TableCell>CLAIM DESCRIPTION</TableCell>
                <TableCell sx={{ width: "120px" }}>
                  EVIDENCE SUBMITTED
                </TableCell>
                <TableCell>DOCUMENT / PROOF DESCRIPTION</TableCell>
                <TableCell>FACT-CHECKED AI SUMMARY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={claimEvidenceStyles.tableBody}>
              {claimEvidence.map((evidence) => (
                <TableRow key={evidence.id}>
                  <TableCell sx={claimEvidenceStyles.serialNumberCell}>
                    {evidence.id}
                  </TableCell>
                  <TableCell sx={claimEvidenceStyles.claimCell}>
                    {evidence.claimDescription}
                  </TableCell>
                  <TableCell sx={claimEvidenceStyles.evidenceCell}>
                    <Chip
                      label={evidence.evidenceSubmitted ? "Yes" : "No"}
                      color={evidence.evidenceSubmitted ? "success" : "error"}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={claimEvidenceStyles.documentCell}>
                    {evidence.documentProofDescription}
                  </TableCell>
                  <TableCell sx={claimEvidenceStyles.summaryCell}>
                    {evidence.factCheckedAISummary}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {claimEvidence.length === 0 && (
        <Box sx={claimEvidenceStyles.noDataContainer}>
          <InboxIcon sx={claimEvidenceStyles.noDataIcon} />
          <Typography sx={claimEvidenceStyles.noDataText}>
            No data found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ClaimEvidence;
