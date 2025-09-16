export interface IFRClaim {
  id: string;
  farmerId: string;
  farmerName: string;
  village: string;
  hectares: number;
  latitude: number;
  longitude: number;
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface CRClaim {
  id: string;
  farmerId: string;
  farmerName: string;
  village: string;
  documents: string[];
  shapefile?: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface PitRecord {
  id: string;
  farmerId: string;
  farmerName: string;
  village: string;
  latitude: number;
  longitude: number;
  photos: string[];
  pitCount: number;
  saplingCount: number;
  year1SurvivalPhotos?: string[];
  year2SurvivalPhotos?: string[];
  year1SurvivalRate?: number;
  year2SurvivalRate?: number;
  incentiveCalculated?: number;
  status: 'active' | 'completed';
  submittedAt: Date;
  lastUpdated: Date;
}

export interface BlockchainLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  action: string;
  details: Record<string, any>;
  hash: string;
}