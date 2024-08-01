import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { loginService } from "../services/AuthService";
import { ILoginReq } from "../interfaces/Request/User/LoginReq";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/Slices/authSlice";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const schema = yup.object().shape({
    userName: yup.string().required("Username is a required field"),
    password: yup.string().required("Password is a required field"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginReq>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ILoginReq) => {
    setLoading(true);

    var res = await loginService(data);
    if (res.isSuccess) {
      dispatch(setAuth(res.data));
      navigate("/dashboard");
    } else {
      setIsError(true);
    }
    setLoading(false);
  };

  const render = (
    <>
      <div className="flex h-full items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          {isError && (
            <Alert severity="error">
              Username or Password is not correct !!!
            </Alert>
          )}
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                {...register("userName")}
                error={Boolean(errors.userName)}
                helperText={errors.userName?.message}
                size="small"
                label="Username"
                variant="outlined"
                className="block w-full py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="block relative">
              <TextField
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                size="small"
                label="Password"
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                variant="outlined"
                className="block w-full py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <div
                className="inline-block absolute h-full p-2 right-0 cursor-pointer"
                onClick={() => setVisible(!visible)}
              >
                {visible ? (
                  <VisibilityIcon color="disabled" />
                ) : (
                  <VisibilityOffIcon color="disabled" />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return <>{loading ? <Loading /> : render}</>;
};

export default Login;
