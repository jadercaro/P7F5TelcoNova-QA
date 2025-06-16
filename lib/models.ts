export type Incident = {
  id: number;
  state: "opened" | "inProgress" | "closed";
  clientName: string;
  description: string;
  assignedTechnician: string;
  creationDate: Date;
  closingDate: Date;
};