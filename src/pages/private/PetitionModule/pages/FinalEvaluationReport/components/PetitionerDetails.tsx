import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import {
  Person as PersonIcon,
  PersonOutline as FatherIcon,
  LocationOn as AddressIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { PetitionerDetails as PetitionerDetailsType } from "../data/finalEvaluationData";
import { petitionerDetailsStyles } from "./PetitionerDetails.style";

interface PetitionerDetailsProps {
  petitionerDetails: PetitionerDetailsType;
}

const PetitionerDetails: React.FC<PetitionerDetailsProps> = ({
  petitionerDetails,
}) => {
  const detailItems = [
    {
      label: "Name",
      value: petitionerDetails.name,
      icon: <PersonIcon sx={petitionerDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Father Name",
      value: petitionerDetails.fatherName,
      icon: <FatherIcon sx={petitionerDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Phone No.",
      value: petitionerDetails.phoneNo,
      icon: <PhoneIcon sx={petitionerDetailsStyles.icon} />,
      flex: 3,
    },
    {
      label: "Address",
      value: petitionerDetails.address,
      icon: <AddressIcon sx={petitionerDetailsStyles.icon} />,
      flex: 5,
    },
  ];

  return (
    <Card sx={petitionerDetailsStyles.card}>
      <CardContent sx={petitionerDetailsStyles.cardContent}>
        <Typography variant="h6" sx={petitionerDetailsStyles.sectionTitle}>
          Petitioner Details
        </Typography>

        <Box sx={petitionerDetailsStyles.detailContainer}>
          {detailItems.map((item, index) => (
            <React.Fragment key={index}>
              <Box
                sx={{
                  flex: item.flex,
                  ...petitionerDetailsStyles.detailItem,
                }}
              >
                {item.icon}
                <Box sx={petitionerDetailsStyles.contentBox}>
                  <Typography
                    variant="caption"
                    sx={petitionerDetailsStyles.label}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={petitionerDetailsStyles.value}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
              {index < detailItems.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={petitionerDetailsStyles.divider}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetitionerDetails;
