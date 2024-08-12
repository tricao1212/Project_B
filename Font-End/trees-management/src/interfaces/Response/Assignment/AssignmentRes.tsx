import { WorkContentRes } from "../WorkContent/WorkContentRes";

interface AssignmentRes {
  id: string;
  treeId: string;
  userId: string;
  workContent: WorkContentRes[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export type { AssignmentRes };