import React from "react";
import { Box, Button, Stack, Chip, Typography } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ClaimUploadSection({
  claimIndex,
}: {
  claimIndex: number;
}) {
  const { control, watch, setValue } = useFormContext();
  const files = watch(`claims.${claimIndex}.files`) || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setValue(`claims.${claimIndex}.files`, [...files, ...newFiles], {
      shouldValidate: true,
    });
    e.target.value = "";
  };

  const handleRemoveFile = (fileIdx: number) => {
    setValue(
      `claims.${claimIndex}.files`,
      files.filter((_: File, idx: number) => idx !== fileIdx),
      { shouldValidate: true }
    );
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
                size="small"
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
                  size="small"
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
