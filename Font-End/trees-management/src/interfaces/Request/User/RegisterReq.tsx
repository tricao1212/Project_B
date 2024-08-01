interface RegisterReq {
  userName: string;
  password: string;
  fullName: string;
  phone: string | null;
  avatar: string | null;
  dob: Date | null;
  role: number | null;
}

export type { RegisterReq };
