import { WorkStatus } from "../interfaces/Enum/WorkStatus";

export const getWorkStatus = (status: WorkStatus): string => {
  switch (status) {
    case WorkStatus.OnProgress:
      return 'On Progress';
    case WorkStatus.Finished:
      return 'Finished';
    default:
      return 'Unknown';
  }
};