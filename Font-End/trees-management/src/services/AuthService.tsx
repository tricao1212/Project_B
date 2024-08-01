import axios from "../config/axiosCustomize";
import { ILogin } from "../interfaces/Request/ILoginReq";

const loginService = async (loginData: ILogin) => {
  return (await axios.post("/user/login", loginData)).data;
};

export { loginService };
