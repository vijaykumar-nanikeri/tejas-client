import React from "react";
import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ClaimGroupCard from "./ClaimGroupCard";

export default function ClaimChecklistBoard() {
  const methods = useFormContext();

  return (
    <Box sx={{ width: "100%" }}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log("Form Data:", data);
        })}
        style={{ width: "100%" }}
      >
        <ClaimGroupCard />
      </form>
    </Box>
  );
}
