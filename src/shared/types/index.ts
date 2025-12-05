export interface Spirit {
  id: string;
  name: string;
  threatLevel: SpiritThreatLevel;
  location: string;
  status: SpiritStatus;
  lastUpdate: number;
}

export enum SpiritThreatLevel {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Critical = "Critical",
}

export enum SpiritStatus {
  Active = "Active",
  Captured = "Captured",
}

export interface CaptureResponse {
  success: boolean;
  spiritId: string;
  message?: string;
}

export interface SSEMessage {
  type: "threat_update";
  data: {
    spiritId: string;
    newThreatLevel: Spirit["threatLevel"];
    timestamp: number;
  };
}
