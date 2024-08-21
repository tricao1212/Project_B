import axios from "../config/axiosCustomize";
import { TypeTreeReq } from "../interfaces/Request/TypeTree/TypeTreeReq";

const getAllTypeTree = async () => {
  const response = (await axios.get("/typetree/getall")).data;
  return response;
};

const getTypeTreeById = async (id: string) => {
  const response = (await axios.delete(`/typetree/getbyid/?Id=${id}`)).data;
  return response;
};

const createTypeTree = async (typeTreeReq: TypeTreeReq, token: string) => {
  const response = (
    await axios.post("/typetree/add", typeTreeReq, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const updateTypeTree = async (id : string, typeTreeReq: TypeTreeReq, token: string) => {
  const response = (
    await axios.put(`/typetree/update?Id=${id}`, typeTreeReq, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const deleteTypeTree = async (id: string, token: string) => {
  const response = (
    await axios.delete(`/typetree/delete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const softDeleteTypeTree = async (id: string, token: string) => {
  return (
    await axios.delete(`/typetree/softdelete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export {
  getAllTypeTree,
  getTypeTreeById,
  createTypeTree,
  updateTypeTree,
  deleteTypeTree,
  softDeleteTypeTree,
};
