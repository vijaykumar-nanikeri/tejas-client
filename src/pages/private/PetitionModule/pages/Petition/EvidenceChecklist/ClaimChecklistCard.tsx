import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import PendingIcon from "@mui/icons-material/Pending";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useFormContext } from "react-hook-form";
import ClaimUploadSection from "./ClaimUploadSection";

const statusMap: any = {
  pending: {
    color: "error",
    label: "Pending",
    icon: PendingIcon,
    bgColor: "#ffebee",
  },
  incomplete: {
    color: "warning",
    label: "Incomplete",
    icon: WarningIcon,
    bgColor: "#fff3e0",
  },
  uploaded: {
    color: "success",
    label: "Uploaded",
    icon: CheckCircleIcon,
    bgColor: "#e8f5e8",
  },
  error: {
    color: "error",
    label: "Error",
    icon: ErrorIcon,
    bgColor: "#ffebee",
  },
};

export default function ClaimChecklistCard({
  claimIndex,
}: {
  claimIndex: number;
}) {
  const { watch } = useFormContext();
  const claim = watch(`claims.${claimIndex}`);
  const status = claim?.status || "pending";
  // @ts-ignore
  const StatusIcon = statusMap[status]?.icon || PendingIcon;

  return (
    <Card
      sx={{
        borderRadius: 2,
        height: 350,
        display: "flex",
        flexDirection: "column",
        boxShadow: 1,
        background: "#fff",
        width: "100%",
        mb: 1,
      }}
    >
      <CardContent
        sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              color: "text.primary",
              fontSize: "1.1rem",
              flex: 1,
              mr: 2,
            }}
          >
            {claim?.title || `Claim ${claimIndex + 1}`}
          </Typography>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: statusMap[status]?.bgColor || "#ffebee",
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              flexShrink: 0,
            }}
          >
            <StatusIcon
              fontSize="small"
              color={statusMap[status]?.color || "error"}
              sx={{ mr: 0.5 }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: `${statusMap[status]?.color}.main`,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {statusMap[status]?.label || "Pending"}
            </Typography>
          </Box> */}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontSize: "0.75rem",
          }}
        >
          Checklist Items:
        </Typography>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            maxHeight: 175,
            borderRadius: 1,
            p: 1,
          }}
        >
          <List dense disablePadding>
            {(claim?.checklist || []).map((item: any, idx: number) => (
              <ListItem key={idx} disableGutters sx={{ pl: 0, mb: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 20 }}>
                  <CircleIcon
                    fontSize="small"
                    sx={{
                      color: "primary.main",
                      fontSize: "8px",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        fontWeight: 400,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.label}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>
      <ClaimUploadSection claimIndex={claimIndex} />
    </Card>
  );
}
