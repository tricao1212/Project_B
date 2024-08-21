import axios from '../config/axiosCustomize'
import { LoginReq } from "../interfaces/Request/User/LoginReq";

const getAllUser = async (token: string) => {
  const response = (
    await axios.get("/user/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const login = async (loginData: LoginReq) => {
  const response = (await axios.post("/user/login", loginData)).data;
  return response;
};

const getUserById = async (id: string) => {
  const response = (await axios.post(`/user/getbyid?Id=${id}`)).data;

  return response;
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

const updateUser = async (id : string, formData: FormData, token: string) => {
  const response = (
    await axios.put(`/user/update?Id=${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const deleteUser = async (id: string, token: string) => {
  const response = (
    await axios.delete(`/user/delete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

const softDeleteUser = async (id: string, token: string) => {
  const response = (
    await axios.delete(`/user/softdelete/?Id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return response;
};

export {
  getAllUser,
  register,
  login,
  deleteUser,
  getUserById,
  softDeleteUser,
  updateUser,
};
