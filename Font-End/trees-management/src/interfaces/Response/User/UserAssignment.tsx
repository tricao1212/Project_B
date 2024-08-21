import { WorkContentRes } from "../WorkContent/WorkContentRes";

interface UserAssignment {
  id: string;
  treeId: string;
  workContent: WorkContentRes[];
  createdBy: string;
  deadLine: Date;
  isRequest: boolean;
  progress: number;
}

export type { UserAssignment };