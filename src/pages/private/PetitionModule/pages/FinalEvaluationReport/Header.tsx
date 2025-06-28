import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Description as DescriptionIcon,
  PriorityHigh as PriorityHighIcon,
  Remove as PriorityMediumIcon,
  KeyboardArrowDown as PriorityLowIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import logoImage from "images/logo.svg";

interface HeaderProps {
  onBack?: () => void;
  petitionId?: string;
  priorityLevel?: "High" | "Medium" | "Low";
  onPrint?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onBack,
  petitionId = "PET-2024-001",
  priorityLevel = "Medium",
  onPrint,
}) => {
  const getPriorityIcon = (level: string) => {
    switch (level) {
      case "High":
        return (
          <PriorityHighIcon sx={{ color: "error.main", fontSize: "1rem" }} />
        );
      case "Medium":
        return (
          <PriorityMediumIcon
            sx={{ color: "warning.main", fontSize: "1rem" }}
          />
        );
      case "Low":
        return (
          <PriorityLowIcon sx={{ color: "success.main", fontSize: "1rem" }} />
        );
      default:
        return (
          <PriorityMediumIcon
            sx={{ color: "warning.main", fontSize: "1rem" }}
          />
        );
    }
  };

  const getPriorityColor = (level: string) => {
    switch (level) {
      case "High":
        return "error.main";
      case "Medium":
        return "warning.main";
      case "Low":
        return "success.main";
      default:
        return "warning.main";
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {/* Main Header Row */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          mb: 1,
        }}
      >
        {/* Left side - Back button */}
        {onBack && (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              position: "absolute",
              left: 0,
              zIndex: 1,
            }}
          >
            Back to Summary
          </Button>
        )}

        {/* Center - Title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img
            src={logoImage}
            alt="TEJAS Logo"
            style={{
              width: "32px",
              height: "32px",
              marginRight: "12px",
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
              letterSpacing: 0.5,
            }}
          >
            Final Evaluation Report
          </Typography>
        </Box>

        {/* Right side - Print button */}
        <Button
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          variant="outlined"
          size="small"
          sx={{
            textTransform: "capitalize",
            position: "absolute",
            right: 0,
            zIndex: 1,
          }}
        >
          Print
        </Button>
      </Box>

      {/* Bottom - Combined Petition ID and Priority Badge */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Chip
          icon={
            <DescriptionIcon
              sx={{ fontSize: "0.8rem", color: "primary.main" }}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, fontSize: "0.7rem" }}
              >
                {petitionId}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                {getPriorityIcon(priorityLevel)}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color: getPriorityColor(priorityLevel),
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    fontSize: "0.6rem",
                  }}
                >
                  {priorityLevel}
                </Typography>
              </Box>
            </Box>
          }
          size="small"
          variant="outlined"
          sx={{
            borderColor: "primary.main",
            color: "primary.main",
            backgroundColor: "background.paper",
            boxShadow: 1,
            height: "24px",
            "& .MuiChip-label": {
              px: 0.5,
              py: 0.25,
            },
            "& .MuiChip-icon": {
              fontSize: "0.8rem",
              ml: 0.5,
              mr: 0.5,
              color: "primary.main",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Header;
