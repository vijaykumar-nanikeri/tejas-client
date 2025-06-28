import React, { useRef, useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { remarksStyles } from "./Remarks.style";

interface RemarksProps {
  content: string;
}

const Remarks: React.FC<RemarksProps> = ({ content }) => {
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
    <Box sx={remarksStyles.container}>
      <Typography variant="h6" sx={remarksStyles.sectionTitle}>
        Remarks
      </Typography>

      <Paper sx={remarksStyles.card}>
        <Box sx={remarksStyles.contentContainer}>
          <Typography
            ref={textRef}
            sx={remarksStyles.contentText}
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
            <Box sx={remarksStyles.scrollIndicator}>
              <Typography sx={remarksStyles.scrollText}>
                Scroll to show more
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Remarks;
