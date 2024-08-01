import axios from "../config/axiosCustomize";

const getAll = async () => {
  return (await axios.get("/tree/all")).data;
};

const addNew = async (formData: FormData) => {
  const response = (
    await axios.post("/tree/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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

export { getAll, addNew, deleteTree };
