import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

type protectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: protectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }

    if (user !== null) {
      navigate("/dashboard");
    }


  }, [user]);

  return user ? children : null;
};

export default ProtectedRoute;