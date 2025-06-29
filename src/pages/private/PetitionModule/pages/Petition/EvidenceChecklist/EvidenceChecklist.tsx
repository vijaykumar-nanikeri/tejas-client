import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box } from "@mui/material";
import ClaimChecklistBoard from "./ClaimChecklistBoard";
import { useAppSelector } from "src/stores/hooks";

interface EvidenceChecklistFormData {
  claims: Array<{
    title: string;
    checklist: Array<{ label: string; checked: boolean }>;
    status: string;
    files: File[];
  }>;
}

interface EvidenceChecklistProps {
  onShowQualityReview: () => void;
}

const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({
  onShowQualityReview,
}) => {
  const { claims, isLoading, error } = useAppSelector((state) => state.claims);

  // Separate form for evidence checklist
  const evidenceFormMethods = useForm<EvidenceChecklistFormData>({
    defaultValues: {
      claims: [],
    },
  });

  useEffect(() => {
    evidenceFormMethods.reset({
      claims: claims?.map((claim) => ({
        title: claim?.claimType,
        checklist: claim?.evidenceChecklist?.map((item: any) => ({
          label: item,
          checked: false,
        })),
        status: "pending",
        files: [],
      })),
    });
  }, [claims, evidenceFormMethods]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        Loading claims...
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          color: "error.main",
        }}
      >
        {error}
      </Box>
    );
  }

  if (!claims || claims.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        No claims found. Please upload a file first.
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <FormProvider {...evidenceFormMethods}>
        <ClaimChecklistBoard onShowQualityReview={onShowQualityReview} />
      </FormProvider>
    </Box>
  );
};

export default EvidenceChecklist;
