import { WorkContentReq } from "../WorkContent/WorkContentReq";

interface AssignmentReq {
  treeId: string;
  userId: string;
  workContent: WorkContentReq[];
}

export type { AssignmentReq };
