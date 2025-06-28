export interface EvidenceData {
  document: string;
  quality: "good" | "bad";
  aiFeedback: string;
}

export interface ClaimData {
  claimNo: string;
  claimName: string;
  evidences: EvidenceData[];
  hasMissingDocuments: boolean;
}

export const claimsData: ClaimData[] = [
  {
    claimNo: "001",
    claimName: "Harassment",
    evidences: [
      {
        document: "Medical Certificate.pdf",
        quality: "good",
        aiFeedback:
          "Document is clear and properly formatted. All required information is present.",
      },
      {
        document: "Call Logs.pdf",
        quality: "bad",
        aiFeedback:
          "Document is blurry and some text is unreadable. Please upload a clearer version.",
      },
      {
        document: "Complaint Statement.pdf",
        quality: "good",
        aiFeedback:
          "Statement is well-written and contains all necessary details.",
      },
    ],
    hasMissingDocuments: true,
  },
  {
    claimNo: "002",
    claimName: "Encroachment",
    evidences: [
      {
        document: "Land Title Document.pdf",
        quality: "good",
        aiFeedback:
          "Document is authentic and contains all required legal information.",
      },
      {
        document: "Survey Report.pdf",
        quality: "bad",
        aiFeedback:
          "Report is incomplete. Missing surveyor signature and date.",
      },
    ],
    hasMissingDocuments: false,
  },
];
