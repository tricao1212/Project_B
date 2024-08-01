import { IUserRes } from "./IUserRes";

interface ILoginRes {
  token: string;
  user: IUserRes | null;
}

export type { ILoginRes };
