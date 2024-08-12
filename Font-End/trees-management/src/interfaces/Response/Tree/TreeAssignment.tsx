import { WorkContentRes } from "../WorkContent/WorkContentRes";

interface TreeAssignment {
  id: string;
  userId: string;
  workContent: WorkContentRes[];
  createdBy: string;
}

export type { TreeAssignment };