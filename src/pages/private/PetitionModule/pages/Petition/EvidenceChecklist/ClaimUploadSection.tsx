import React from "react";
import { Box, Button, Stack, Typography, Chip } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "src/stores/hooks";
import {
  addFilesToClaim,
  removeFileFromClaim,
} from "src/stores/slices/claimsSlice";

export default function ClaimUploadSection({
  claimIndex,
}: {
  claimIndex: number;
}) {
  const dispatch = useAppDispatch();
  const claims = useAppSelector((state) => state.claims.claims);
  const claim = claims[claimIndex];
  const files = claim?.files || [];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    if (newFiles.length > 0) {
      dispatch(addFilesToClaim({ claimIndex, files: newFiles }));
    }
  };

  const handleRemoveFile = (fileIndex: number) => {
    dispatch(removeFileFromClaim({ claimIndex, fileIndex }));
  };

  return (
    <Box sx={{ px: 2, pb: 2, mx: 2, mb: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          Choose Files
          <input
            type="file"
            multiple
            hidden
            onChange={handleFileChange}
            accept=".pdf,.docx,.doc,.txt,.jpg,.jpeg,.png,.gif"
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
            size="small"
          />
        ))}
      </Stack>
    </Box>
  );
}
