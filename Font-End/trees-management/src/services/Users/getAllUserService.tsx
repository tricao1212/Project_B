import axios from "../../config/axiosCustomize";

const getAllUserService = async (token: string) => {
  return (
    await axios.get("/user/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export { getAllUserService };
