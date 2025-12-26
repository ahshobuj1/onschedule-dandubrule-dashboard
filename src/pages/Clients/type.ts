export type ClientStatus = 'active' | 'inactive';

export interface IClient {
  id: string;
  company: string;
  status: ClientStatus;
  name: string;
  email: string;
  phone: string;
  cranes: number;
  location: string;
  additionalNote: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
}
