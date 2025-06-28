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
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  Analytics as AnalyticsIcon,
  Inbox as InboxIcon,
} from "@mui/icons-material";
import { EvidenceStrengthAnalysis as EvidenceStrengthAnalysisType } from "../data/finalEvaluationData";
import { evidenceStrengthAnalysisStyles } from "./EvidenceStrengthAnalysis.style";

interface EvidenceStrengthAnalysisProps {
  evidenceStrengthAnalysis: EvidenceStrengthAnalysisType[];
  overallAIScore: number;
  officerScore: number;
}

const EvidenceStrengthAnalysis: React.FC<EvidenceStrengthAnalysisProps> = ({
  evidenceStrengthAnalysis,
  overallAIScore,
  officerScore,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 7) return "success";
    if (score >= 4) return "warning";
    return "error";
  };

  const getScoreVariant = (score: number) => {
    if (score >= 7) return "filled";
    if (score >= 4) return "outlined";
    return "outlined";
  };

  return (
    <Box sx={evidenceStrengthAnalysisStyles.container}>
      <Typography variant="h6" sx={evidenceStrengthAnalysisStyles.sectionTitle}>
        <AnalyticsIcon sx={evidenceStrengthAnalysisStyles.titleIcon} />
        Evidence Strength Analysis
      </Typography>

      <Box sx={evidenceStrengthAnalysisStyles.tableContainer}>
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table sx={evidenceStrengthAnalysisStyles.table}>
            <TableHead sx={evidenceStrengthAnalysisStyles.tableHead}>
              <TableRow>
                <TableCell sx={{ width: "60px" }}>S.NO</TableCell>
                <TableCell>METRIC</TableCell>
                <TableCell sx={evidenceStrengthAnalysisStyles.scoreCell}>
                  SCORE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={evidenceStrengthAnalysisStyles.tableBody}>
              {evidenceStrengthAnalysis.map((evidence) => (
                <TableRow key={evidence.id}>
                  <TableCell
                    sx={evidenceStrengthAnalysisStyles.serialNumberCell}
                  >
                    {evidence.id}
                  </TableCell>
                  <TableCell sx={evidenceStrengthAnalysisStyles.metricCell}>
                    {evidence.metric}
                  </TableCell>
                  <TableCell sx={evidenceStrengthAnalysisStyles.scoreCell}>
                    <Chip
                      label={`${evidence.score}/10`}
                      color={getScoreColor(evidence.score)}
                      variant={getScoreVariant(evidence.score)}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {evidenceStrengthAnalysis.length === 0 && (
        <Box sx={evidenceStrengthAnalysisStyles.noDataContainer}>
          <InboxIcon sx={evidenceStrengthAnalysisStyles.noDataIcon} />
          <Typography sx={evidenceStrengthAnalysisStyles.noDataText}>
            No data found.
          </Typography>
        </Box>
      )}

      {/* Ratings Section */}
      <Box sx={evidenceStrengthAnalysisStyles.ratingsContainer}>
        <Box sx={evidenceStrengthAnalysisStyles.ratingItem}>
          <Typography sx={evidenceStrengthAnalysisStyles.ratingLabel}>
            Overall Evidence AI Evaluation Score
          </Typography>
          <Box sx={evidenceStrengthAnalysisStyles.progressContainer}>
            <LinearProgress
              variant="determinate"
              value={(overallAIScore / 10) * 100}
              sx={evidenceStrengthAnalysisStyles.progressBar}
            />
            <Typography sx={evidenceStrengthAnalysisStyles.scoreText}>
              {overallAIScore}/10
            </Typography>
          </Box>
        </Box>

        <Box sx={evidenceStrengthAnalysisStyles.ratingItem}>
          <Typography sx={evidenceStrengthAnalysisStyles.ratingLabel}>
            Officer Score (Analysis & Handling)
          </Typography>
          <Box sx={evidenceStrengthAnalysisStyles.progressContainer}>
            <LinearProgress
              variant="determinate"
              value={(officerScore / 10) * 100}
              sx={evidenceStrengthAnalysisStyles.progressBar}
            />
            <Typography sx={evidenceStrengthAnalysisStyles.scoreText}>
              {officerScore}/10
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EvidenceStrengthAnalysis;
