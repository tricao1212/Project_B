import axios from "../config/axiosCustomize";
import { AssignmentReq } from "../interfaces/Request/Assignment/AssignmentReq";

const getAllAssignment = async () => {
  const response = (await axios.get("/assignment/getall")).data;
  return response;
};

const getHistory = async (token : string) => {
  const response = (
    await axios.get("/assignment/gethistory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
  return response;
};

const getAssignmentById = async (id: string) => {
  const response = (await axios.post(`/assignment/getbyid/?Id=${id}`)).data;
  return response;
};

const sendRequestConfirm = async (id: string, token: string) => {
  const response = (
    await axios.post(
      `/assignment/sendrequest?Id=${id}`, 
      {},  // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).data;

  return response;
};

const createAssignment = async (assignmentReq: AssignmentReq, token: string) => {
  const response = (
    await axios.post("/assignment/add", assignmentReq, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const updateAssignment = async (id: string, assignmentReq: AssignmentReq, token: string) => {
  const response = (
    await axios.put(`/assignment/update?Id=${id}`, assignmentReq, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const updateStatusAssignment = async (id : string, assignmentReq: AssignmentReq, token: string) => {
    const response = (
      await axios.put(`/assignment/updatestatus?Id=${id}`, assignmentReq, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  
    return response;
  };

const deleteAssignment = async (id: string, token: string) => {
  const response = (
    await axios.delete(`/assignment/delete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const softDeleteAssignment = async (id: string, token: string) => {
  return (
    await axios.delete(`/assignment/softdelete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export {
  getAllAssignment,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  updateStatusAssignment,
  deleteAssignment,
  softDeleteAssignment,
  getHistory,
  sendRequestConfirm,
};
