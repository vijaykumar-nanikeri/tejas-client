import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box } from "@mui/material";
import ClaimChecklistBoard from "../../ClaimChecklistBoard";

interface EvidenceChecklistFormData {
  claims: Array<{
    title: string;
    checklist: Array<{ label: string; checked: boolean }>;
    status: string;
    files: File[];
  }>;
}

const EvidenceChecklist: React.FC = () => {
  // Separate form for evidence checklist
  const evidenceFormMethods = useForm<EvidenceChecklistFormData>({
    defaultValues: {
      claims: [
        {
          title: "Harassment",
          checklist: [
            { label: "Medical Certificate", checked: false },
            { label: "Call Logs", checked: false },
            { label: "Complaint Statement", checked: false },
          ],
          status: "pending",
          files: [],
        },
        {
          title: "Encroachment",
          checklist: [
            { label: "Land Title Document", checked: true },
            { label: "Survey Report", checked: false },
            { label: "Panchayat Letter", checked: false },
          ],
          status: "incomplete",
          files: [],
        },
      ],
    },
  });

  return (
    <Box sx={{ width: "100%" }}>
      <FormProvider {...evidenceFormMethods}>
        <ClaimChecklistBoard />
      </FormProvider>
    </Box>
  );
};

export default EvidenceChecklist;
