import { format } from "date-fns";

const formatDateTime = (date: Date): string => {
  return format(date, "MMMM d, yyyy, h:mm:ss aa");
};

const formatDateOnly = (date: Date): string => {
  return format(date, "MMMM d, yyyy");
};

export { formatDateTime, formatDateOnly };
