import axios from "../config/axiosCustomize";
import { ILoginReq } from "../interfaces/Request/User/LoginReq";

const loginService = async (loginData: ILoginReq) => {
  return (await axios.post("/user/login", loginData)).data;
};

export { loginService };
