import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Claim {
  claim: string;
  claimType: string;
  evidenceChecklist: string[];
}

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface ClaimWithFiles extends Claim {
  files: File[];
  fileInfos: FileInfo[];
  status: "pending" | "incomplete" | "uploaded" | "error";
}

export interface ClaimsState {
  claims: ClaimWithFiles[];
  isLoading: boolean;
  error: string | null;
  isUploading: boolean;
  uploadProgress: number;
  extractedText: string;
  evidenceFileContents: string;
}

const initialState: ClaimsState = {
  claims: [],
  isLoading: false,
  error: null,
  isUploading: false,
  uploadProgress: 0,
  extractedText: "",
  evidenceFileContents: "",
};

// Helper function to convert File to FileInfo
const fileToFileInfo = (file: File): FileInfo => ({
  name: file.name,
  size: file.size,
  type: file.type,
  lastModified: file.lastModified,
});

const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    setClaims: (state, action: PayloadAction<Claim[]>) => {
      state.claims = action.payload.map((claim) => ({
        ...claim,
        files: [],
        fileInfos: [],
        status: "pending",
      }));
      state.error = null;
    },
    addClaim: (state, action: PayloadAction<Claim>) => {
      state.claims.push({
        ...action.payload,
        files: [],
        fileInfos: [],
        status: "pending",
      });
    },
    updateClaim: (
      state,
      action: PayloadAction<{ index: number; claim: ClaimWithFiles }>
    ) => {
      const { index, claim } = action.payload;
      if (index >= 0 && index < state.claims.length) {
        state.claims[index] = claim;
      }
    },
    removeClaim: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.claims.length) {
        state.claims.splice(index, 1);
      }
    },
    clearClaims: (state) => {
      state.claims = [];
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setExtractedText: (state, action: PayloadAction<string>) => {
      state.extractedText = action.payload;
    },
    setEvidenceFileContents: (state, action: PayloadAction<string>) => {
      state.evidenceFileContents = action.payload;
    },
    // File upload actions
    addFilesToClaim: {
      reducer: (
        state,
        action: PayloadAction<{
          claimIndex: number;
          files: File[];
          fileInfos: FileInfo[];
        }>
      ) => {
        const { claimIndex, files, fileInfos } = action.payload;
        if (claimIndex >= 0 && claimIndex < state.claims.length) {
          state.claims[claimIndex].files = [
            ...state.claims[claimIndex].files,
            ...files,
          ];
          state.claims[claimIndex].fileInfos = [
            ...state.claims[claimIndex].fileInfos,
            ...fileInfos,
          ];
          state.claims[claimIndex].status =
            state.claims[claimIndex].files.length > 0
              ? "incomplete"
              : "pending";
        }
      },
      prepare: (payload: { claimIndex: number; files: File[] }) => {
        const fileInfos = payload.files.map(fileToFileInfo);
        return {
          payload: {
            ...payload,
            fileInfos,
          },
        };
      },
    },
    removeFileFromClaim: (
      state,
      action: PayloadAction<{ claimIndex: number; fileIndex: number }>
    ) => {
      const { claimIndex, fileIndex } = action.payload;
      if (claimIndex >= 0 && claimIndex < state.claims.length) {
        state.claims[claimIndex].files.splice(fileIndex, 1);
        state.claims[claimIndex].fileInfos.splice(fileIndex, 1);
        state.claims[claimIndex].status =
          state.claims[claimIndex].files.length > 0 ? "incomplete" : "pending";
      }
    },
    clearFilesFromClaim: (state, action: PayloadAction<number>) => {
      const claimIndex = action.payload;
      if (claimIndex >= 0 && claimIndex < state.claims.length) {
        state.claims[claimIndex].files = [];
        state.claims[claimIndex].fileInfos = [];
        state.claims[claimIndex].status = "pending";
      }
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
      if (!action.payload) {
        state.uploadProgress = 0;
      }
    },
    setUploadProgress: (
      state,
      action: PayloadAction<number | ((prev: number) => number)>
    ) => {
      if (typeof action.payload === "function") {
        state.uploadProgress = action.payload(state.uploadProgress);
      } else {
        state.uploadProgress = action.payload;
      }
    },
    updateClaimStatus: (
      state,
      action: PayloadAction<{
        claimIndex: number;
        status: ClaimWithFiles["status"];
      }>
    ) => {
      const { claimIndex, status } = action.payload;
      if (claimIndex >= 0 && claimIndex < state.claims.length) {
        state.claims[claimIndex].status = status;
      }
    },
  },
});

export const {
  setClaims,
  addClaim,
  updateClaim,
  removeClaim,
  clearClaims,
  setLoading,
  setError,
  setExtractedText,
  setEvidenceFileContents,
  addFilesToClaim,
  removeFileFromClaim,
  clearFilesFromClaim,
  setUploading,
  setUploadProgress,
  updateClaimStatus,
} = claimsSlice.actions;

export default claimsSlice.reducer;
