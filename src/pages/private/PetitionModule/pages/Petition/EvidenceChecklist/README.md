# Evidence Checklist File Upload

This module handles the file upload functionality for evidence checklist items.

## Features

- **Multiple File Upload**: Each claim card can have multiple files uploaded
- **File Management**: Add/remove files from individual claims
- **Bulk Upload**: Submit all files from all claims at once
- **Progress Tracking**: Real-time upload progress with visual feedback
- **Status Management**: Track upload status for each claim
- **Error Handling**: Comprehensive error handling and user feedback

## Components

### ClaimChecklistCard

- Displays individual claim information
- Shows evidence checklist items
- Contains file upload section
- Displays claim status

### ClaimUploadSection

- Handles file selection and removal
- Manages files for a specific claim
- Integrates with Redux for state management

### ClaimGroupCard

- Manages the overall upload process
- Handles bulk file submission
- Shows upload progress and status
- Confirmation dialog for submission

## Redux Integration

### State Structure

```typescript
interface ClaimsState {
  claims: ClaimWithFiles[];
  isLoading: boolean;
  error: string | null;
  isUploading: boolean;
  uploadProgress: number;
}

interface ClaimWithFiles {
  claim: string;
  claimType: string;
  evidenceChecklist: string[];
  files: File[];
  status: "pending" | "incomplete" | "uploaded" | "error";
}
```

### Actions

- `addFilesToClaim` - Add files to a specific claim
- `removeFileFromClaim` - Remove a file from a claim
- `setUploading` - Set upload state
- `setUploadProgress` - Update upload progress
- `updateClaimStatus` - Update claim status

## File Upload Flow

1. **File Selection**: Users can select multiple files for each claim
2. **File Management**: Files can be added/removed from claims
3. **Validation**: System checks if files are selected before submission
4. **Upload Process**:
   - Shows progress bar
   - Uploads all files to server
   - Updates claim statuses
5. **Success/Error Handling**: Provides feedback and updates UI accordingly

## Server Endpoints

### `/fileSelection/uploadEvidence`

- Handles bulk upload of all claim files
- Accepts multiple files with metadata
- Returns upload status and file information

### `/fileSelection/uploadSingleClaim`

- Handles upload for a single claim
- Useful for individual claim uploads

## Usage

```typescript
// Upload files to a claim
dispatch(addFilesToClaim({ claimIndex: 0, files: selectedFiles }));

// Remove a file from a claim
dispatch(removeFileFromClaim({ claimIndex: 0, fileIndex: 1 }));

// Submit all files
const uploadService = FileUploadService.getInstance();
const result = await uploadService.uploadClaimFiles(claims);
```

## File Types Supported

- PDF files (.pdf)
- Word documents (.docx, .doc)
- Text files (.txt)
- Images (.jpg, .jpeg, .png, .gif)

## Error Handling

- Network errors
- File size limits
- Invalid file types
- Server errors
- Upload failures

## Status Indicators

- **Pending**: No files uploaded
- **Incomplete**: Files uploaded but not submitted
- **Uploaded**: Files successfully uploaded to server
- **Error**: Upload failed or error occurred
