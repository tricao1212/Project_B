import * as yup from 'yup';

interface LoginReq {
  userName: string;
  password: string;
}

export const schema = yup.object().shape({
  userName: yup.string().required("Username is a required field"),
  password: yup.string().required("Password is a required field"),
});

export type { LoginReq };
