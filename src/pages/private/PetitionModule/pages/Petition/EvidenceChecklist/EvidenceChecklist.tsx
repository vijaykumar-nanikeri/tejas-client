import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box } from "@mui/material";
import ClaimChecklistBoard from "./ClaimChecklistBoard";

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
  claims: any[];
}

const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({
  onShowQualityReview,
  claims,
}) => {
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

  return (
    <Box sx={{ width: "100%" }}>
      <FormProvider {...evidenceFormMethods}>
        <ClaimChecklistBoard onShowQualityReview={onShowQualityReview} />
      </FormProvider>
    </Box>
  );
};

export default EvidenceChecklist;
