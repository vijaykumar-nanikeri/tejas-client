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
};
