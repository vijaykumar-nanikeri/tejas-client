export interface PetitionerDetails {
  name: string;
  fatherName: string;
  address: string;
  phoneNo: string;
}

export interface IncidentDetails {
  date: string;
  time: string;
  place: string;
}

export interface VictimDetails {
  name: string;
  fatherName: string;
  address: string;
  phoneNo: string;
}

export interface AccusedDetails {
  name: string;
  fatherName: string;
  address: string;
  phoneNo: string;
}

export interface BriefFactsSummary {
  summary: string;
}

export interface ClaimAndFacts {
  id: number;
  date: string;
  claimDescription: string;
  supportingFacts: string;
}

export interface ClaimEvidence {
  id: number;
  claimDescription: string;
  evidenceSubmitted: boolean;
  documentProofDescription: string;
  factCheckedAISummary: string;
}

export interface EnquiryReportSummary {
  summary: string;
}

export interface Remarks {
  content: string;
}

export interface ActionDetailsByIO {
  content: string;
}

export interface SystemRecommendations {
  content: string;
}

export interface PetitionDetails {
  petitionId: string;
  priorityLevel: "High" | "Medium" | "Low";
  submissionDate: string;
  status: string;
}

export interface FinalEvaluationData {
  petitionDetails: PetitionDetails;
  petitionerDetails: PetitionerDetails;
  incidentDetails: IncidentDetails;
  victimDetails: VictimDetails;
  accusedDetails: AccusedDetails;
  briefFactsSummary: BriefFactsSummary;
  enquiryReportSummary: EnquiryReportSummary;
  remarks: Remarks;
  actionDetailsByIO: ActionDetailsByIO;
  systemRecommendations: SystemRecommendations;
  claimsAndFacts: ClaimAndFacts[];
  claimEvidence: ClaimEvidence[];
}

export const finalEvaluationData: FinalEvaluationData = {
  petitionDetails: {
    petitionId: "PET-2024-001",
    priorityLevel: "Medium",
    submissionDate: "2024-01-15",
    status: "Under Review",
  },
  petitionerDetails: {
    name: "Rajesh Kumar Sharma",
    fatherName: "Mohan Lal Sharma",
    address: "House No. 45, Sector 12, Gandhi Nagar, New Delhi - 110031",
    phoneNo: "+91-98765-43210",
  },
  incidentDetails: {
    date: "2024-01-10",
    time: "14:30",
    place: "Central Market, Connaught Place, New Delhi",
  },
  victimDetails: {
    name: "Priya Sharma",
    fatherName: "Rajesh Kumar Sharma",
    address: "House No. 45, Sector 12, Gandhi Nagar, New Delhi - 110031",
    phoneNo: "+91-98765-43211",
  },
  accusedDetails: {
    name: "Amit Kumar Singh",
    fatherName: "Ramesh Kumar Singh",
    address: "Flat No. 23, Building A, Green Park, New Delhi - 110016",
    phoneNo: "+91-98765-43212",
  },
  briefFactsSummary: {
    summary:
      "The petitioner alleges that on January 10, 2024, at approximately 2:30 PM, the accused Amit Kumar Singh physically assaulted his daughter Priya Sharma at Central Market, Connaught Place, New Delhi. The incident occurred following a verbal altercation regarding a parking dispute. The petitioner claims that the accused used abusive language and then proceeded to physically harm the victim, resulting in minor injuries. The petitioner is seeking legal action against the accused for assault and harassment. The incident was witnessed by several bystanders who have provided statements supporting the petitioner's claims. The petitioner has submitted medical reports and photographs as evidence of the injuries sustained by the victim.",
  },
  enquiryReportSummary: {
    summary:
      "Based on the evidence and officer inputs, the petition appears to be True with the core claims being substantiated. The accused has evaded during investigation. Officer actions such as counseling, arrests, notices, and further inquiries were carried out. The submitted documents include CCTV footage, medical reports, witness affidavits, and photographic evidence which collectively support the petition's grounds. The investigation revealed multiple eyewitness accounts corroborating the petitioner's version of events, and the medical examination confirmed physical injuries consistent with the alleged assault. The accused was served multiple notices but failed to cooperate with the investigation process.",
  },
  remarks: {
    content:
      "Sample remarks. This section contains additional observations and notes about the case that may not fit into other categories. These remarks provide context and insights that could be relevant for the final evaluation and decision-making process.",
  },
  actionDetailsByIO: {
    content:
      "Sample remarks. The Investigating Officer has taken several actions including serving notices to the accused, conducting field investigations, collecting witness statements, and gathering documentary evidence. The IO has also coordinated with medical authorities for injury assessment and with technical teams for digital evidence analysis.",
  },
  systemRecommendations: {
    content:
      "Sample remarks. Based on the AI analysis and evaluation of all submitted evidence, the system recommends proceeding with the case as the claims appear substantiated. Further investigation may be required to strengthen certain aspects of the case, particularly regarding the verbal abuse allegations.",
  },
  claimsAndFacts: [
    {
      id: 1,
      date: "2024-01-10",
      claimDescription: "Physical assault and battery causing bodily harm",
      supportingFacts:
        "Medical reports from Safdarjung Hospital confirming injuries, eyewitness statements from 3 bystanders, CCTV footage from Central Market showing the altercation, photographs of injuries taken immediately after the incident.",
    },
    {
      id: 2,
      date: "2024-01-10",
      claimDescription: "Verbal abuse and harassment in public place",
      supportingFacts:
        "Audio recording of the verbal altercation, statements from shopkeepers in the vicinity, police complaint filed on the same day, multiple witnesses confirming the use of abusive language.",
    },
  ],
  claimEvidence: [
    {
      id: 1,
      claimDescription: "Physical assault and battery causing bodily harm",
      evidenceSubmitted: true,
      documentProofDescription:
        "Medical certificate from Safdarjung Hospital, photographs of injuries, eyewitness statements from 3 bystanders, CCTV footage from Central Market",
      factCheckedAISummary:
        "AI analysis confirms medical evidence supports physical injury claims. CCTV footage corroborates the incident timeline. Multiple eyewitness statements provide consistent account of the assault.",
    },
    {
      id: 2,
      claimDescription: "Verbal abuse and harassment in public place",
      evidenceSubmitted: false,
      documentProofDescription:
        "No audio recordings or witness statements submitted for verbal abuse claims",
      factCheckedAISummary:
        "Insufficient evidence to verify verbal abuse allegations. No audio recordings or corroborating witness statements available for AI analysis.",
    },
  ],
};
