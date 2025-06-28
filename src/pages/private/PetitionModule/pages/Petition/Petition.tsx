import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Stack,
  InputAdornment,
  TextField,
  Paper,
  Chip,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Upload as UploadIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { petitionStyles } from "./Petition.style";

interface PetitionFormData {
  fileFormat: string;
  selectedFile: File | null;
  description: string;
}

const Petition: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PetitionFormData>({
    defaultValues: {
      fileFormat: "pdf",
      selectedFile: null,
      description: "",
    },
  });

  const formValidationRules = {
    fileFormat: {
      required: "Please select a file format",
    },
    selectedFile: {
      required: "Please select a file to upload",
      validate: (value: File | null) => {
        if (!value) return "Please select a file";
        if (value.size > 10 * 1024 * 1024) {
          return "File size should be less than 10MB";
        }
        return true;
      },
    },
    description: {
      required: "Please provide a description",
      minLength: {
        value: 10,
        message: "Description must be at least 10 characters",
      },
    },
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setValue("selectedFile", file);
  };

  const onSubmit = async (data: PetitionFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Petition submitted:", data);
      // Handle success
    } catch (error) {
      console.error("Error submitting petition:", error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={petitionStyles.container}>
      <Card sx={petitionStyles.card}>
        <CardContent sx={petitionStyles.cardContent}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* File Format Selection */}
              <Box>
                <Typography variant="body1" gutterBottom>
                  Select File Format
                </Typography>
                <Controller
                  name="fileFormat"
                  control={control}
                  rules={formValidationRules.fileFormat}
                  render={({ field }) => (
                    <FormControl
                      component="fieldset"
                      error={!!errors.fileFormat}
                    >
                      <RadioGroup {...field} row sx={petitionStyles.radioGroup}>
                        <FormControlLabel
                          value="pdf"
                          control={<Radio />}
                          label="PDF"
                        />
                        <FormControlLabel
                          value="docx"
                          control={<Radio />}
                          label="DOCX"
                        />
                        <FormControlLabel
                          value="txt"
                          control={<Radio />}
                          label="TXT"
                        />
                      </RadioGroup>
                      {errors.fileFormat && (
                        <Typography color="error" variant="caption">
                          {errors.fileFormat.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Box>

              {/* File Upload */}
              <Box>
                <Typography variant="body1" gutterBottom>
                  Upload File
                </Typography>
                <Controller
                  name="selectedFile"
                  control={control}
                  rules={formValidationRules.selectedFile}
                  render={({}) => (
                    <Box>
                      <Paper
                        variant="outlined"
                        sx={petitionStyles.uploadPaper(selectedFile)}
                      >
                        <input
                          type="file"
                          accept=".pdf,.docx,.txt"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button
                            component="span"
                            variant="contained"
                            startIcon={<UploadIcon />}
                            sx={petitionStyles.chooseFileButton}
                          >
                            Choose File
                          </Button>
                        </label>
                        {selectedFile && (
                          <Box>
                            <Chip
                              label={selectedFile.name}
                              color="success"
                              onDelete={() => {
                                setSelectedFile(null);
                                setValue("selectedFile", null);
                              }}
                            />
                          </Box>
                        )}
                      </Paper>
                      {errors.selectedFile && (
                        <Typography color="error" variant="caption">
                          {errors.selectedFile.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>

              {/* Description */}
              <Box>
                <Typography variant="body1" gutterBottom>
                  Description
                </Typography>
                <Controller
                  name="description"
                  control={control}
                  rules={formValidationRules.description}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Enter petition description..."
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>

              {/* Submit Button */}
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={<SendIcon />}
                >
                  {isSubmitting ? "Submitting..." : "Submit Petition"}
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Petition;
