import React from "react";
import { Box, Card } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ClaimGroupCard from "./ClaimGroupCard";

export default function ClaimChecklistBoard() {
  const methods = useFormContext();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ m: 2, width: "100%" }}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: "100%" }}
        >
          <ClaimGroupCard />
        </form>
      </Card>
    </Box>
  );
}
