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
  isRequest: boolean;
  progress: number;
  finishedAt: Date;
}

export type { AssignmentRes };