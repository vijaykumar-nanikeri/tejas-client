import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import {
  Person as PersonIcon,
  PersonOutline as FatherIcon,
  LocationOn as AddressIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { AccusedDetails as AccusedDetailsType } from "../data/finalEvaluationData";
import { accusedDetailsStyles } from "./AccusedDetails.style";

interface AccusedDetailsProps {
  accusedDetails: AccusedDetailsType;
}

const AccusedDetails: React.FC<AccusedDetailsProps> = ({ accusedDetails }) => {
  const detailItems = [
    {
      label: "Name",
      value: accusedDetails.name,
      icon: <PersonIcon sx={accusedDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Father Name",
      value: accusedDetails.fatherName,
      icon: <FatherIcon sx={accusedDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Phone No.",
      value: accusedDetails.phoneNo,
      icon: <PhoneIcon sx={accusedDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Address",
      value: accusedDetails.address,
      icon: <AddressIcon sx={accusedDetailsStyles.icon} />,
      flex: 5,
    },
  ];

  return (
    <Card sx={accusedDetailsStyles.card}>
      <CardContent sx={accusedDetailsStyles.cardContent}>
        <Typography variant="h6" sx={accusedDetailsStyles.sectionTitle}>
          Accused / Respondent Details
        </Typography>

        <Box sx={accusedDetailsStyles.detailContainer}>
          {detailItems.map((item, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  flex: item.flex,
                  ...accusedDetailsStyles.detailItem,
                }}
              >
                {item.icon}
                <Box sx={accusedDetailsStyles.contentBox}>
                  <Typography variant="caption" sx={accusedDetailsStyles.label}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={accusedDetailsStyles.value}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
              {index < detailItems.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={accusedDetailsStyles.divider}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccusedDetails;
