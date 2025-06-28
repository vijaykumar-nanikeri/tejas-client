import React from "react";
import { Box, Button, Stack, Typography, Chip } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useFormContext, Controller } from "react-hook-form";

export default function ClaimUploadSection({
  claimIndex,
}: {
  claimIndex: number;
}) {
  const { control, setValue, watch } = useFormContext();
  const files = watch(`claims.${claimIndex}.files`) || [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const currentFiles = files || [];
    const updatedFiles = [...currentFiles, ...newFiles];
    setValue(`claims.${claimIndex}.files`, updatedFiles);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = files.filter(
      (_: any, idx: number) => idx !== indexToRemove
    );
    setValue(`claims.${claimIndex}.files`, updatedFiles);
  };

  return (
    <Box sx={{ px: 2, pb: 2, mx: 2, mb: 2 }}>
      <Controller
        name={`claims.${claimIndex}.files`}
        control={control}
        render={() => (
          <>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
              >
                Choose Files
                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              <Typography variant="caption" color="text.secondary">
                {files.length} file(s) selected
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
              {files.map((file: File, idx: number) => (
                <Chip
                  key={idx}
                  label={file.name}
                  onDelete={() => handleRemoveFile(idx)}
                  deleteIcon={<DeleteIcon />}
                  sx={{ mb: 0.5 }}
                />
              ))}
            </Stack>
          </>
        )}
      />
    </Box>
  );
}
