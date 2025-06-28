import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import { enquiryReportSummaryStyles } from "./EnquiryReportSummary.style";

interface EnquiryReportSummaryProps {
  content: string;
}

const EnquiryReportSummary: React.FC<EnquiryReportSummaryProps> = ({
  content,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (textRef.current) {
        const { scrollHeight, clientHeight } = textRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [content]);

  return (
    <Box sx={enquiryReportSummaryStyles.container}>
      <Typography variant="h6" sx={enquiryReportSummaryStyles.sectionTitle}>
        Enquiry Report Evolution Summary by AI
      </Typography>

      <Box sx={enquiryReportSummaryStyles.taglineContainer}>
        <Chip
          icon={<InfoIcon />}
          label="Summary Based On: Officer-submitted evidence; Petition content; Field investigation notes; Witness statements; Digital evidence (if any)"
          variant="outlined"
          size="small"
          sx={enquiryReportSummaryStyles.taglineChip}
        />
      </Box>

      <Paper sx={enquiryReportSummaryStyles.card}>
        <Box sx={enquiryReportSummaryStyles.contentContainer}>
          <Typography
            ref={textRef}
            sx={enquiryReportSummaryStyles.contentText}
            onScroll={() => {
              if (textRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                  textRef.current;
                setShowScrollIndicator(scrollTop < scrollHeight - clientHeight);
              }
            }}
          >
            {content}
          </Typography>

          {showScrollIndicator && (
            <Box sx={enquiryReportSummaryStyles.scrollIndicator}>
              <Typography sx={enquiryReportSummaryStyles.scrollText}>
                Scroll to show more
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default EnquiryReportSummary;
