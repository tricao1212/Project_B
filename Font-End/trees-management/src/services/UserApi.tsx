import axios from "../config/axiosCustomize";

const getAll = async (token: string) => {
  return (
    await axios.get("/user/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

const register = async (formData: FormData, token: string) => {
  const response = (
    await axios.post("/user/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const deleteTree = async (id: string, token: string) => {
  return (
    await axios.delete(`/tree/delete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export { getAll, register, deleteTree };
