import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { KeyboardArrowDown as ScrollIcon } from "@mui/icons-material";
import { BriefFactsSummary as BriefFactsSummaryType } from "../data/finalEvaluationData";
import { briefFactsSummaryStyles } from "./BriefFactsSummary.style";

interface BriefFactsSummaryProps {
  briefFactsSummary: BriefFactsSummaryType;
}

const BriefFactsSummary: React.FC<BriefFactsSummaryProps> = ({
  briefFactsSummary,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [briefFactsSummary.summary]);

  return (
    <Card sx={briefFactsSummaryStyles.card}>
      <CardContent sx={briefFactsSummaryStyles.cardContent}>
        <Typography variant="h6" sx={briefFactsSummaryStyles.sectionTitle}>
          Brief Facts Summary of the Petition
        </Typography>

        <Box
          ref={containerRef}
          sx={{
            backgroundColor: "grey.50",
            border: "1px solid",
            borderColor: "grey.200",
            borderRadius: 2,
            p: 2.5,
            minHeight: "95px",
            maxHeight: "95px",
            overflow: "auto",
            position: "relative",
            transition: "all 0.3s ease",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              backgroundColor: "primary.main",
              borderRadius: "2px 0 0 2px",
            },
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "grey.100",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "3px",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
            "&:hover .scroll-indicator": {
              opacity: 0,
            },
          }}
        >
          <Typography variant="body2" sx={briefFactsSummaryStyles.summaryText}>
            {briefFactsSummary.summary}
          </Typography>

          {showScrollIndicator && (
            <Box
              className="scroll-indicator"
              sx={briefFactsSummaryStyles.scrollIndicator}
            >
              <ScrollIcon sx={{ fontSize: "0.8rem", mr: 0.5 }} />
              Scroll to read more
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BriefFactsSummary;
