export interface IProject {
  description?: string;
  gatewayIds?: string[];
  image?: string;
  industry?: string;
  name: string;
  projectId: string;
  rule?: string;
  structure?: string;
  userIds?: string[];
  website?: string;
}

export interface IReport {
  amount: number;
  created: string;
  gatewayId: string;
  gatewayName: string;
  modified: string;
  paymentId: string;
  projectId: string;
  userIds: string[];
}

export interface IGateway {
  description: string;
  gatewayId: string;
  image: string;
  industry: string;
  name: string;
  projectId: string;
  rule: string;
  structure: string;
  userIds: string[];
  website: string;
}

export interface IFilters {
  toDate: string | null;
  fromDate: string | null;
  projectId: string | null;
  gatewayId: string | null;
}
