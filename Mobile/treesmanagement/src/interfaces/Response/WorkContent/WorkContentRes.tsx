import { WorkStatus } from "../../Enum/WorkStatus";

interface WorkContentRes {
    id: string;
    content: string;
    status: WorkStatus;
}

export type {WorkContentRes}