// @ts-nocheck
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
  InputAdornment,
  TextField,
  Paper,
  Chip,
} from "@mui/material";
import {
  Description as DescriptionIcon,
  Upload as UploadIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { petitionStyles } from "../Petition.style";
import AxiosClient from "src/services/AxiosClient/AxiosClient";
import { extractJsonFromGptResponse } from "src/utils/helpers/common.helpers";

interface FileSelectionFormData {
  fileFormat: string;
  selectedFile: File | null;
  description: string;
}

interface FileSelectionProps {
  onBack?: () => void;
  onFileSelected?: (file: File) => void;
  setClaims?: (claims: any[]) => void;
}

const FileSelection: React.FC<FileSelectionProps> = ({
  onBack,
  onFileSelected,
  setClaims,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FileSelectionFormData>({
    defaultValues: {
      fileFormat: "docx",
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setValue("selectedFile", file);

    // Call the onFileSelected method if provided and file is selected
    if (file && onFileSelected) {
      onFileSelected(file);
    }

    // If file is selected, read its content and send to API
    if (file) {
      try {
        const formData = new FormData();
        formData.append("files", file);

        const { fileFormat } = getValues();

        let url = "/fileSelection/plainText";

        if (fileFormat === "pdf") {
          url = "/fileSelection/pdf";
        }

        if (fileFormat === "docx") {
          url = "/fileSelection/docx";
        }

        const response = await AxiosClient.getInstance().post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setValue("description", response.data.message);
      } catch (error) {
        console.error("Error processing file:", error);
        // Handle error - you might want to show a notification to user
      }
    }
  };

  // Helper function to read file content
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target?.result as string;
        resolve(content);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      // Read as text for text-based files
      if (file.type.includes("text") || file.type === "application/pdf") {
        reader.readAsText(file);
      } else {
        // For other file types, read as base64
        reader.readAsDataURL(file);
      }
    });
  };

  const onSubmit = async (data: FileSelectionFormData) => {
    setIsSubmitting(true);
    try {
      const promptMessage =
        "You are a legal assistant working with the Andhra Pradesh Police. Given a citizen complaint, extract and organize all information required to generate a formal petition evaluation report.\n\nYour responsibilities are:\n\n### 1. Extract and Classify Claims\n- Identify all valid legal claims from the complaint text.\n- Prioritize classification using the following official categories:\n  - Dowry\n  - Harassment\n  - Robbery\n  - Attempt to Murder\n  - Encroachment\n- If a claim does not match any of these, classify it as: `Other: [custom type]`\n\nFor each claim, return:\n- `claim`: A short, clear description of the claim\n- `claimType`: One of the 5 above or `Other: [label]`\n- `evidenceChecklist`: A list of relevant evidence types based on the nature of the claim\n\n### 2. Extract Case Details (for Report Generation)\nFrom the complaint text or context, extract:\n- `petitionerDetails`: name, fatherName (if available), address, phoneNo\n- `victimDetails` (if different)\n- `accusedDetails`: array of accused persons with name, fatherName or husbandName, and address\n- `dateAndPlaceOfIncident`: date, time (if known), and location\n- `briefFactsSummary`: 1–2 sentence factual summary of the incident\n\nReturn the full response in **structured JSON format** using camelCase keys only. If any information is missing or not available in the text, leave it as `null` or an empty string. Do not include commentary or explanation.";
      const requestJson = {
        promptMessage,
        inputText: "Complaint text:\n" + data.description,
      };

      const response = await AxiosClient.getInstance().post("/ai", requestJson);

      const parsed = extractJsonFromGptResponse(response.data.message);

      setClaims(parsed?.claims || parsed?.extractedClaims || []);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("File selection submitted:", data);
      // Handle success - could trigger evidence checklist generation
    } catch (error) {
      console.error("Error submitting file selection:", error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={petitionStyles.container}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        {onBack && (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              position: "absolute",
              left: 0,
              zIndex: 1,
            }}
          >
            Back
          </Button>
        )}
        <Typography
          variant="h6"
          sx={{
            width: "100%",
            textAlign: "center",
            fontWeight: 600,
            color: "primary.main",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            letterSpacing: 0.5,
          }}
        >
          File Selection & Upload
        </Typography>
      </Box>

      <Card sx={{ ...petitionStyles.card, width: "100%" }}>
        <CardContent sx={{ ...petitionStyles.cardContent, p: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", gap: 3 }}>
              {/* First Column - 40% */}
              <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {/* File Format Selection */}
                <Box sx={petitionStyles.stackBox}>
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
                        <RadioGroup
                          {...field}
                          row
                          sx={petitionStyles.radioGroup}
                        >
                          <FormControlLabel
                            value="docx"
                            control={<Radio />}
                            label="DOCX"
                          />
                          <FormControlLabel
                            value="pdf"
                            control={<Radio />}
                            label="PDF"
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
                <Box sx={{ width: "100%" }}>
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
                          <Box sx={petitionStyles.uploadContainer}>
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
                              <Chip
                                label={selectedFile.name}
                                color="success"
                                onDelete={() => {
                                  setSelectedFile(null);
                                  setValue("selectedFile", null);
                                }}
                              />
                            )}
                          </Box>
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
              </Box>

              {/* Second Column - 60% */}
              <Box
                sx={{ width: "60%", display: "flex", flexDirection: "column" }}
              >
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
                      fullWidth
                      placeholder="Enter petition description..."
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      sx={{
                        height: "175px",
                        "& .MuiInputBase-root": {
                          height: "100%",
                          alignItems: "flex-start",
                        },
                        "& .MuiInputBase-input": {
                          height: "100% !important",
                          overflow: "auto",
                          resize: "none",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ mt: 1 }}>
                            <DescriptionIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

      {/* Extract Claims Button - Outside the card */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 0 }}>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          disabled={isSubmitting}
          startIcon={<SendIcon />}
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {isSubmitting ? "Extracting..." : "Extract Claims"}
        </Button>
      </Box>
    </Box>
  );
};

export default FileSelection;
