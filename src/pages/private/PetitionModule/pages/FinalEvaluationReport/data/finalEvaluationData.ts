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
