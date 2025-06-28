import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { actionDetailsByIOStyles } from "./ActionDetailsByIO.style";

interface ActionDetailsByIOProps {
  content: string;
}

const ActionDetailsByIO: React.FC<ActionDetailsByIOProps> = ({ content }) => {
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
    <Box sx={actionDetailsByIOStyles.container}>
      <Typography variant="h6" sx={actionDetailsByIOStyles.sectionTitle}>
        If Yes, Action Details by IO
      </Typography>

      <Paper sx={actionDetailsByIOStyles.card}>
        <Box sx={actionDetailsByIOStyles.contentContainer}>
          <Typography
            ref={textRef}
            sx={actionDetailsByIOStyles.contentText}
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
            <Box sx={actionDetailsByIOStyles.scrollIndicator}>
              <Typography sx={actionDetailsByIOStyles.scrollText}>
                Scroll to show more
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ActionDetailsByIO;
