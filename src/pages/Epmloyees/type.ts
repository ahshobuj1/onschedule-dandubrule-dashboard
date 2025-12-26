export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  role: string; // e.g. Driver, Operator, Manager
  additionalNotes: string;
  employerId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
}
