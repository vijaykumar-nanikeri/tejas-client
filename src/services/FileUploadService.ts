import AxiosClient from "./AxiosClient/AxiosClient";
import { ClaimWithFiles } from "../stores/slices/claimsSlice";

export interface UploadResponse {
  success: boolean;
  message: string;
  uploadedFiles?: string[];
  errors?: string[];
}

export class FileUploadService {
  private static instance: FileUploadService;

  public static getInstance(): FileUploadService {
    if (!FileUploadService.instance) {
      FileUploadService.instance = new FileUploadService();
    }
    return FileUploadService.instance;
  }

  async uploadClaimFiles(
    claims: ClaimWithFiles[],
    dispatch?: any
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();

      // Add all files from all claims to FormData
      claims.forEach((claim, claimIndex) => {
        claim.files.forEach((file, fileIndex) => {
          formData.append(`claim_${claimIndex}_file_${fileIndex}`, file);
        });
      });

      // Add claims metadata
      const claimsMetadata = claims.map((claim, index) => ({
        claimIndex: index,
        claimType: claim.claimType,
        claim: claim.claim,
        evidenceChecklist: claim.evidenceChecklist,
        fileCount: claim.files.length,
      }));

      formData.append("claimsMetadata", JSON.stringify(claimsMetadata));

      const response = await AxiosClient.getInstance().post(
        "/fileSelection/uploadEvidence",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              // You can dispatch progress updates here if needed
              console.log(`Upload progress: ${progress}%`);
            }
          },
        }
      );

      console.log("vvv-bulk upload", response.data.message);

      // Store the response.data.message in Redux if dispatch is provided
      if (dispatch) {
        const { setEvidenceFileContents } = await import(
          "../stores/slices/claimsSlice"
        );
        dispatch(setEvidenceFileContents(response.data.message));
        console.log(
          "Evidence file contents stored in Redux from FileUploadService:",
          response.data.message
        );
      }

      return {
        success: true,
        message: response.data.message || "Files uploaded successfully",
        uploadedFiles: response.data.uploadedFiles,
      };
    } catch (error: any) {
      console.error("Error uploading files:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to upload files",
        errors: error.response?.data?.errors || [],
      };
    }
  }

  async uploadSingleClaimFiles(
    claimIndex: number,
    files: File[],
    dispatch?: any
  ): Promise<UploadResponse> {
    try {
      const formData = new FormData();

      files.forEach((file, fileIndex) => {
        formData.append(`claim_${claimIndex}_file_${fileIndex}`, file);
      });

      formData.append("claimIndex", claimIndex.toString());

      const response = await AxiosClient.getInstance().post(
        "/fileSelection/uploadSingleClaim",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Store the response.data.message in Redux if dispatch is provided
      if (dispatch) {
        const { setEvidenceFileContents } = await import(
          "../stores/slices/claimsSlice"
        );
        dispatch(setEvidenceFileContents(response.data.message));
        console.log(
          "Single claim evidence file contents stored in Redux from FileUploadService:",
          response.data.message
        );
      }

      return {
        success: true,
        message: response.data.message || "Files uploaded successfully",
        uploadedFiles: response.data.uploadedFiles,
      };
    } catch (error: any) {
      console.error("Error uploading files for claim:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to upload files",
        errors: error.response?.data?.errors || [],
      };
    }
  }
}

export default FileUploadService;
