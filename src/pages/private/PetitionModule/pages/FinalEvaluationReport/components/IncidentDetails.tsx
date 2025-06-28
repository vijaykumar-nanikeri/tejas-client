import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { IncidentDetails as IncidentDetailsType } from "../data/finalEvaluationData";
import { incidentDetailsStyles } from "./IncidentDetails.style";

interface IncidentDetailsProps {
  incidentDetails: IncidentDetailsType;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({
  incidentDetails,
}) => {
  const detailItems = [
    {
      label: "Date",
      value: incidentDetails.date,
      icon: <CalendarIcon sx={incidentDetailsStyles.icon} />,
      flex: 2,
    },
    {
      label: "Time",
      value: incidentDetails.time,
      icon: <TimeIcon sx={incidentDetailsStyles.icon} />,
      flex: 2,
    },
    {
      label: "Place",
      value: incidentDetails.place,
      icon: <LocationIcon sx={incidentDetailsStyles.icon} />,
      flex: 8,
    },
  ];

  return (
    <Card sx={incidentDetailsStyles.card}>
      <CardContent sx={incidentDetailsStyles.cardContent}>
        <Typography variant="h6" sx={incidentDetailsStyles.sectionTitle}>
          Date and Placement of Incident
        </Typography>

        <Box sx={incidentDetailsStyles.detailContainer}>
          {detailItems.map((item, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  flex: item.flex,
                  ...incidentDetailsStyles.detailItem,
                }}
              >
                {item.icon}
                <Box sx={incidentDetailsStyles.contentBox}>
                  <Typography
                    variant="caption"
                    sx={incidentDetailsStyles.label}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={incidentDetailsStyles.value}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
              {index < detailItems.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={incidentDetailsStyles.divider}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default IncidentDetails;
