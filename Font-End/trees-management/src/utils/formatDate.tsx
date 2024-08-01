import { format } from "date-fns";

const formatDate = (date: Date): string => {
  return format(date, "MMMM d, yyyy, h:mm:ss aa");
};

export { formatDate };
