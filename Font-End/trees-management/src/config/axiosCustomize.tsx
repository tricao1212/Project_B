import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:2024/api",
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
