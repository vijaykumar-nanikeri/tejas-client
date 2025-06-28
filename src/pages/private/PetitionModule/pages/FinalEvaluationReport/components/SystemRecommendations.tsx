import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { systemRecommendationsStyles } from "./SystemRecommendations.style";

interface SystemRecommendationsProps {
  content: string;
}

const SystemRecommendations: React.FC<SystemRecommendationsProps> = ({
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
    <Box sx={systemRecommendationsStyles.container}>
      <Typography variant="h6" sx={systemRecommendationsStyles.sectionTitle}>
        If No, System Recommendations
      </Typography>

      <Paper sx={systemRecommendationsStyles.card}>
        <Box sx={systemRecommendationsStyles.contentContainer}>
          <Typography
            ref={textRef}
            sx={systemRecommendationsStyles.contentText}
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
            <Box sx={systemRecommendationsStyles.scrollIndicator}>
              <Typography sx={systemRecommendationsStyles.scrollText}>
                Scroll to show more
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default SystemRecommendations;
