import { UserRes } from "./UserRes";

interface LoginRes {
  token: string;
  user: UserRes | null;
}

export type { LoginRes };
