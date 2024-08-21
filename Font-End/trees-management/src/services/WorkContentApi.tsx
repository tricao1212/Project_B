import axios from "../config/axiosCustomize";
import { WorkContentReq } from "../interfaces/Request/WorkContent/WorkContentReq";

const updateStatus = async (id: string, workReq: WorkContentReq) => {
  const response = (await axios.put(`/workcontent/update?Id=${id}`, workReq))
    .data;

  return response;
};

export { updateStatus };
