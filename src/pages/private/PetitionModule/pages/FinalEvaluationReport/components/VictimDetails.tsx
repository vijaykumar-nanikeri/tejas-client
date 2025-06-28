import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import {
  Person as PersonIcon,
  PersonOutline as FatherIcon,
  LocationOn as AddressIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { VictimDetails as VictimDetailsType } from "../data/finalEvaluationData";
import { victimDetailsStyles } from "./VictimDetails.style";

interface VictimDetailsProps {
  victimDetails: VictimDetailsType;
}

const VictimDetails: React.FC<VictimDetailsProps> = ({ victimDetails }) => {
  const detailItems = [
    {
      label: "Name",
      value: victimDetails.name,
      icon: <PersonIcon sx={victimDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Father Name",
      value: victimDetails.fatherName,
      icon: <FatherIcon sx={victimDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Phone No.",
      value: victimDetails.phoneNo,
      icon: <PhoneIcon sx={victimDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Address",
      value: victimDetails.address,
      icon: <AddressIcon sx={victimDetailsStyles.icon} />,
      flex: 5,
    },
  ];

  return (
    <Card sx={victimDetailsStyles.card}>
      <CardContent sx={victimDetailsStyles.cardContent}>
        <Typography variant="h6" sx={victimDetailsStyles.sectionTitle}>
          Victim Details (If different from Petitioner)
        </Typography>

        <Box sx={victimDetailsStyles.detailContainer}>
          {detailItems.map((item, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  flex: item.flex,
                  ...victimDetailsStyles.detailItem,
                }}
              >
                {item.icon}
                <Box sx={victimDetailsStyles.contentBox}>
                  <Typography variant="caption" sx={victimDetailsStyles.label}>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={victimDetailsStyles.value}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
              {index < detailItems.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={victimDetailsStyles.divider}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default VictimDetails;
