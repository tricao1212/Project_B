import { WorkContentReq } from "../WorkContent/WorkContentReq";

interface AssignmentReq {
  treeId: string;
  userId: string;
  deadLine: Date;
  workContent: WorkContentReq[];
}

export type { AssignmentReq };
