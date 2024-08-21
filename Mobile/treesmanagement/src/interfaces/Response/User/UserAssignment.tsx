import { WorkContentRes } from "../WorkContent/WorkContentRes";

interface UserAssignment {
  id: string;
  treeId: string;
  workContent: WorkContentRes[];
  createdBy: string;
}

export type { UserAssignment };