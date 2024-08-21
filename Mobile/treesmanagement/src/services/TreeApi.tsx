import axios from "../config/axiosCustomize";

const getAllTree = async () => {
  const response = (await axios.get("/tree/getall")).data;
  return response;
};

const getTreeById = async (id: string) => {
  const response = (await axios.post(`/tree/getbyid/?Id=${id}`)).data;
  return response;
};

const createTree = async (formData: FormData, token: string) => {
  const response = (
    await axios.post("/tree/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const updateTree = async (id:string , formData: FormData, token: string) => {
  const response = (
    await axios.put(`/tree/update?Id=${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const deleteTree = async (id: string, token: string) => {
  const response = (
    await axios.delete(`/tree/delete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const softDeleteTree = async (id: string, token: string) => {
  return (
    await axios.delete(`/tree/softdelete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export {
  getAllTree,
  getTreeById,
  createTree,
  updateTree,
  deleteTree,
  softDeleteTree,
};
