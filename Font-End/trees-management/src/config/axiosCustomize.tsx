import axios from "axios";

const instance = axios.create({
  baseURL: "http://treesmanagement.somee.com/api",
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error.response;
  }
);

export default instance;
