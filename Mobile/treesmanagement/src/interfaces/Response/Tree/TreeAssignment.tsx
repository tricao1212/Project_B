import { WorkContentRes } from "../WorkContent/WorkContentRes";

interface TreeAssignment {
  id: string;
  userId: string;
  workContent: WorkContentRes[];
  deadLine: Date;
  createdBy: string;
}

export type { TreeAssignment };