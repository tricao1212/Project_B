import { WorkContentRes } from "../WorkContent/WorkContentRes";

interface AssignmentRes {
  id: string;
  treeId: string;
  userId: string;
  deadLine: Date;
  workContent: WorkContentRes[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

export type { AssignmentRes };